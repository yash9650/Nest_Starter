import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UserDto } from './User/user.dto';
import { LocalAuthGuard } from './auth/Gaurds/local.auth.guard';
import { Request, Response } from 'express';
import { AuthService } from './auth/auth.service';
import { UserEntity } from './entities/user.entity';
import { JWTAuthGaurd } from './auth/Gaurds/jwt.gaurd';
import { IUserPayload, Role } from './interfaces/auth.interface';
import { errorResponse, successResponse } from './utils/common.utils';
import { UserService } from './User/user.service';
import { Roles } from './auth/Decorators/roles.decorator';
import { RolesGuard } from './auth/Gaurds/roles.gaurds';

@Controller()
export class AppController {
  constructor(
    private readonly _authService: AuthService,
    private readonly _userService: UserService,
  ) {}

  @Post('register')
  async register(
    @Req() req: Request,
    @Res() res: Response,
    @Body() userData: UserDto,
  ) {
    try {
      const userExists = await this._userService.getUserByUserName(
        userData.userName,
      );
      if (userExists) {
        throw new Error('Username already exists!!');
      }
      const token = await this._authService.registerUser(
        userData as UserEntity,
      );
      return successResponse(res, token);
    } catch (error: any) {
      const errorMessage = error?.message || 'Registration failed';
      return errorResponse(res, errorMessage, error);
    }
  }

  /**
   * LocalAuthGaurd used to authenticate the username and password at the time of login
   * Use this Gaurd for Login only
   * @returns JWT Token
   */
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: Request, @Res() res: Response) {
    const user = req.user as IUserPayload;
    try {
      const token = await this._authService.login(user);
      return successResponse(res, token);
    } catch (error: any) {
      const errorMessage = error?.message || 'Login failed';
      return errorResponse(res, errorMessage, error);
    }
  }

  /**
   * JWTAuthGaurd used to validate the token
   * Use this Gaurd for all the protected routes
   */
  @Post('protected')
  @UseGuards(JWTAuthGaurd, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  async protected(@Req() req: Request) {
    return req.user;
  }
}
