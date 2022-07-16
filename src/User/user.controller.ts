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
  Error,
} from './user.interfaces';
import { UserService } from './user.service';

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
  createUser(@Body() loginDto: CreateUserDto) {
    return this.userService.createUser(loginDto);
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
