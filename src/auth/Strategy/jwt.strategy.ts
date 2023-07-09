import { Injectable, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IUserPayload } from 'src/interfaces/auth.interface';

@Injectable()
export class JWTStraegy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
      passReqToCallback: true,
    });
  }
  async validate(@Req() req: Request, payload: IUserPayload) {
    return payload;
  }
}
