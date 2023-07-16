import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity } from 'src/entities/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly _roomRepo: Repository<RoomEntity>,
  ) {}

  async createRoom(room: Partial<RoomEntity>) {
    const newRoom = this._roomRepo.create({
      userOneId: room.userOneId,
      userSecondId: room.userSecondId,
    });
    return await this._roomRepo.save(newRoom);
  }

  async getRoom(roomUUID: string) {
    return await this._roomRepo.findOne({
      where: {
        uuid: roomUUID,
      },
    });
  }
}
