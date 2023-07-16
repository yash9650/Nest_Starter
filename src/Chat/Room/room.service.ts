import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity } from 'src/entities/room.entity';
import { Repository } from 'typeorm';
import { RoomDto } from './room.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly _roomRepo: Repository<RoomEntity>,
  ) {}

  private async _createRoom(room: Partial<RoomEntity>) {
    const newRoom = this._roomRepo.create({
      userOneId: room.userOneId,
      userSecondId: room.userSecondId,
    });
    return await this._roomRepo.save(newRoom);
  }

  async getRoom(roomData: RoomDto) {
    const room = await this._roomRepo.findOne({
      where: [
        {
          userOneId: roomData.userOneId,
          userSecondId: roomData.userSecondId,
        },
        {
          userOneId: roomData.userSecondId,
          userSecondId: roomData.userOneId,
        },
      ],
    });
    if (room) {
      return room;
    }
    return await this._createRoom(roomData);
  }
}
