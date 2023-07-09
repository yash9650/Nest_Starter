import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UserModule } from 'src/User/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWTStraegy } from './Strategy/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { IEnvConstants } from 'src/interfaces/env.interface';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService<IEnvConstants>) => {
        return {
          secret: configService.get<string>('JWT_SECRET_KEY'),
          signOptions: { expiresIn: '30d' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JWTStraegy, ConfigService],
  exports: [AuthService],
})
export class AuthModule {}
