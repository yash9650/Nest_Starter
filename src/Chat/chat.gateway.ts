import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  ConnectedSocket,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { MessageService } from './message.service';
import { RoomService } from './Room/room.service';
import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { RoomDto } from './Room/room.dto';
import { MessageDTO } from './message.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
export class ChatGateway
  implements OnGatewayConnection<Socket>, OnGatewayDisconnect<Socket>
{
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly _authService: AuthService,
    private readonly _messageService: MessageService,
    private readonly _roomService: RoomService,
  ) {}

  async handleConnection(@ConnectedSocket() client: Socket) {
    const authToken =
      client.handshake.headers?.authorization?.split(' ')[1] || '';
    const VerifyTokenResponse = await this._authService.verifyToken(authToken);
    const isVerified = Boolean(VerifyTokenResponse.payload);
    !isVerified && client.disconnect();
  }

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    // console.log('client disconnected', client.id);
  }

  @SubscribeMessage('join-room')
  async joinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody('roomDetails') roomDetails: RoomDto,
  ) {
    try {
      const room = await this._roomService.getRoom(roomDetails);
      await client.join(room.uuid);
      return room.uuid;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @SubscribeMessage('getAllMessages')
  async handleMessage(@MessageBody('roomUUID') roomUUID: string) {
    if (!roomUUID) {
      throw new NotFoundException('Room not found');
    }
    return await this._messageService.getMessages(roomUUID);
  }

  @SubscribeMessage('sendMessage')
  async sendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() message: MessageDTO,
  ) {
    const sendMsg = await this._messageService.sendMessage(message);
    this.server.sockets.in(sendMsg.roomUUID).emit('newMessage', sendMsg);
    return sendMsg;
  }

  @SubscribeMessage('typing')
  async typing(
    @ConnectedSocket() client: Socket,
    @MessageBody('isTyping') isTyping: boolean,
    @MessageBody('roomUUID') roomUUID: string,
  ) {
    const typingMessage = isTyping ? 'Someone is typing' : '';
    client.in(roomUUID).emit('typingStatus', typingMessage);
  }
}
