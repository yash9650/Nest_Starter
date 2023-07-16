import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { MessageService } from './message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from 'src/entities/message.entity';
import { RoomService } from './Room/room.service';
import { RoomEntity } from 'src/entities/room.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([MessageEntity, RoomEntity])],
  controllers: [],
  providers: [ChatGateway, MessageService, RoomService],
})
export class ChatModule {}
