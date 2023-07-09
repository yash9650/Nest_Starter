import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepo: Repository<UserEntity>,
  ) {}

  async getUserByUserName(userName: string) {
    const user = await this._userRepo.findOne({
      where: {
        userName,
      },
    });
    return user;
  }

  async createUser(userData: UserEntity) {
    const user = this._userRepo.create(userData);
    const newUser = await this._userRepo.save(user);
    return newUser;
  }
}
