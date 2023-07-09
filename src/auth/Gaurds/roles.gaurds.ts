import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Global,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IUserPayload, Role } from 'src/interfaces/auth.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const user = req.user as IUserPayload;
    return requiredRoles.some((role) => user.role === role);
  }
}
