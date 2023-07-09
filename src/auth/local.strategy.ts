import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private _authService: AuthService) {
    super({
      usernameField: 'userName',
      passwordField: 'password',
    });
  }
  async validate(userName: string, password: string) {
    const user = await this._authService.validateUser(userName, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
