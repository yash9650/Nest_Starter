import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from 'src/entities/message.entity';
import { In, Repository } from 'typeorm';
import { MessageDTO } from './message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly _messageRepo: Repository<MessageEntity>,
  ) {}

  async sendMessage(newMessage: MessageDTO): Promise<MessageEntity> {
    return await this._messageRepo.save({
      message: newMessage.message,
      roomUUID: newMessage.roomUUID,
      userId: newMessage.senderId,
    });
  }

  async getMessages(roomUUID: string) {
    return await this._messageRepo.find({
      where: [
        {
          roomUUID,
        },
      ],
      order: {
        createdAt: 1,
      },
    });
  }
}
