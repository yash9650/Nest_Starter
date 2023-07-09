import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { emptyResponse } from 'src/utils/common.utils';
import { IJsonResponse } from 'src/interfaces/common.interface';
import { UserEntity } from 'src/entities/user.entity';
import { UserDto } from './user.dto';

@Controller({ path: 'user' })
export class UserController {
  constructor(private readonly _userService: UserService) {}

  private _callUserService = async (
    key: keyof UserService,
    data?: any,
  ): Promise<IJsonResponse<UserEntity | UserEntity[]>> => {
    const jsonResponse = emptyResponse<UserEntity | UserEntity[]>();
    try {
      const response = await this._userService[key](data);
      jsonResponse.success = true;
      jsonResponse.result = response;
      jsonResponse.statusCode = 200;
    } catch (error: any) {
      jsonResponse.error = error;
      jsonResponse.errorMessage = error.message;
      jsonResponse.statusCode = 400;
    }
    return jsonResponse;
  };
}
