import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/User/user.service';
import { UserEntity } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { IUserPayload } from 'src/interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UserService,
    private readonly _jwtService: JwtService,
  ) {}

  private _getToken(payload: IUserPayload) {
    return this._jwtService.sign(payload);
  }

  async validateUser(
    userName: string,
    password: string,
  ): Promise<IUserPayload | null> {
    const user = await this._userService.getUserByUserName(userName);
    if (!user) {
      return null;
    }
    const isVerified = await bcrypt.compare(password, user.password);
    if (!isVerified) {
      return null;
    }
    const { password: _, ...jwtPayload } = user;
    return jwtPayload;
  }

  async registerUser(userData: UserEntity) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
    const { password, ...payload } = await this._userService.createUser(
      userData,
    );
    const token = this.login(payload);
    return token;
  }

  async login(payload: IUserPayload) {
    const token = this._getToken(payload);
    return token;
  }

  async verifyToken(token: string) {
    return this._jwtService.verify(token);
  }
}
