import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from 'src/entities/message.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly _messageRepo: Repository<MessageEntity>,
  ) {}

  async sendMessage(message: Partial<MessageEntity>) {
    return await this._messageRepo.save(message);
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
