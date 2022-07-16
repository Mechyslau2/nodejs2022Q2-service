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
import { CreateUserDto, UpdatePasswordDto, User } from './user.interfaces';
import { UserService } from './user.service';
import { Error } from '../errors/ErrorHandler';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  private checkTypeofError(obj: any): obj is Error {
    return !!(<Error>obj);
  }
  @Get('/:id')
  getUserById(@Param() { id }, @Res() response: Response) {
    const data = this.userService.getUserById(id);
    if (this.checkTypeofError(data) && data?.code) {
      return response.status(data.code).send(data.message);
    } else {
      return response.send(data);
    }
  }
  @Get()
  getAllUsers(): User[] {
    return this.userService.getAllUsers();
  }

  @Post()
  createUser(@Body() loginDto: CreateUserDto, @Res() response: Response) {
    const user = this.userService.createUser(loginDto);
    if (this.checkTypeofError(user) && user?.code) {
      return response.status(user.code).send(user.message);
    } else {
      return response.send(user);
    }
  }

  @Put('/:id')
  updateUserPassword(
    @Body()
    requestData: UpdatePasswordDto,
    @Param()
    { id },
    @Res() response: Response,
  ) {
    const data = this.userService.updatePasswordDto(id, requestData);
    if (this.checkTypeofError(data) && data?.code) {
      return response.status(data.code).send(data.message);
    } else {
      return response.send(data);
    }
  }

  @Delete('/:id')
  deleteUser(@Param() { id }, @Res() response: Response) {
    const data = this.userService.deleteUser(id);
    if (this.checkTypeofError(data) && data?.code) {
      return response.status(data.code).send(data.message);
    } else {
      return response.status(204).send(data);
    }
  }
}
