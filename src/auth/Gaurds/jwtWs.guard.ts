import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtWsGuard implements CanActivate {
  constructor(private readonly _authService: AuthService) {}

  canActivate(context: ExecutionContext) {
    const data = context.switchToWs().getData();
    const authHeader = data.headers.authorization;
    const authToken = authHeader?.split(' ')[1];
    if (!authToken) {
      throw new UnauthorizedException('No token provided');
    }
    const verifyToken = this._authService.verifyToken(authToken);

    return true;
  }
}
