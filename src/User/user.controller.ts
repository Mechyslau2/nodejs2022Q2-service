import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import {
  CreateUserDto,
  UpdatePasswordDto,
  User,
  UserToSend,
} from './user.interfaces';
import { UserService } from './user.service';
import { Error } from '../errors/ErrorHandler';
import { Observable } from 'rxjs';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  private checkTypeofError(obj: any): obj is Error {
    return !!(<Error>obj);
  }

  @Get('/:id')
  async getUserById(
    @Param() { id },
    @Res() response: Response,
  ): Promise<UserToSend | Response> {
    const data = await this.userService.getUserById(id);
    if (this.checkTypeofError(data) && data?.code) {
      return response.status(data.code).send(data.message);
    } else {
      return response.send(data);
    }
  }
  @Get()
  getAllUsers(): Observable<UserToSend[]> {
    return this.userService.getAllUsers();
  }

  @Post()
  async createUser(
    @Body() loginDto: CreateUserDto,
    @Res() response: Response,
  ): Promise<UserToSend | Response> {
    const user = await this.userService.createUser(loginDto);
    if (this.checkTypeofError(user) && user?.code) {
      return response.status(user.code).send(user.message);
    } else {
      return response.status(201).send(user);
    }
  }

  @Put('/:id')
  async updateUserPassword(
    @Body()
    requestData: UpdatePasswordDto,
    @Param()
    { id },
    @Res() response: Response,
  ): Promise<UserToSend | Response> {
    const data = await this.userService.updatePasswordDto(id, requestData);
    if (this.checkTypeofError(data) && data?.code) {
      return response.status(data.code).send(data.message);
    } else {
      return response.send(data);
    }
  }

  @Delete('/:id')
  async deleteUser(
    @Param() { id },
    @Res() response: Response,
  ): Promise<void | Response> {
    const data = await this.userService.deleteUser(id);
    if (this.checkTypeofError(data) && data?.code) {
      return response.status(data.code).send(data.message);
    } else {
      return response.status(204).send(data);
    }
  }
}
