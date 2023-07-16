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
import { MessageEntity } from 'src/entities/message.entity';
import { MessageService } from './message.service';
import { RoomService } from './Room/room.service';
import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { RoomEntity } from 'src/entities/room.entity';
import { RoomDto } from './Room/room.dto';

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
    console.log('client connected', client.id);
    const authToken =
      client.handshake.headers?.authorization?.split(' ')[1] || '';
    const VerifyTokenResponse = await this._authService.verifyToken(authToken);
    const isVerified = Boolean(VerifyTokenResponse.payload);
    !isVerified && client.disconnect();
  }

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log('client disconnected', client.id);
  }

  @SubscribeMessage('join')
  async joinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody('roomDetails') roomDetails: RoomDto,
  ) {
    try {
      let room: RoomEntity;
      if (roomDetails.roomUUID) {
        const roomData = await this._roomService.getRoom(roomDetails.roomUUID);
        if (!roomData) {
          throw new NotFoundException('Room not found');
        }
        room = roomData;
      } else {
        room = await this._roomService.createRoom(roomDetails);
      }
      await client.join(room.uuid);
      console.log(room.uuid);
      return 'Joined Room ' + room.uuid;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @SubscribeMessage('getAllMessages')
  async handleMessage(@MessageBody() message: MessageEntity) {
    return await this._messageService.getMessages(message.roomUUID);
  }

  @SubscribeMessage('sendMessage')
  async sendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() message: Partial<MessageEntity>,
  ) {
    const sendMsg = await this._messageService.sendMessage(message);
    client.in(sendMsg.roomUUID).emit('newMessage', sendMsg);
    return sendMsg;
  }

  @SubscribeMessage('typing')
  async typing(
    @ConnectedSocket() client: Socket,
    @MessageBody('isTyping') isTyping: boolean,
  ) {
    const rooms = client.rooms;
    console.log(rooms);
    const typingMessage = isTyping ? 'Someone is typing' : '';
    client.to('Room-55').emit('typingStatus', typingMessage);
  }
}
