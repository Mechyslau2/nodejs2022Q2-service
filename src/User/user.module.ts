import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { userDB } from '../db/mockedDB';
import { v4 as uuidv4 } from 'uuid';

import { User, CreateUserDto, UpdatePasswordDto } from './user.interfaces';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {
  private createUser(data: CreateUserDto): User {
    const user = { ...data } as User;
    user.id = uuidv4();
    user.version = 1;
    user.createdAt = user.updatedAt = new Date().getTime();
    return user;
  }
  addUser(user: CreateUserDto): User {
    const userData = this.createUser(user);
    userDB.push(userData);
    return userData;
  }

  getUserById(id: string): User {
    const user = userDB.find((searchUser) => searchUser.id === id);
    return user;
  }

  getUsers(): User[] {
    return userDB;
  }

  updateUser(id: string, dataDto: UpdatePasswordDto) {
    const data = userDB.find((user) => user.id === id);
    const index = userDB.findIndex((user) => user.id === id);
    const updatedData = {
      ...data,
      updatedAt: new Date().getTime(),
      password: dataDto.newPassword,
      version: ++data.version,
    };
    userDB[index] = updatedData;
    return updatedData;
  }

  deleteUser(id: string): boolean {
    const userInd = userDB.findIndex((user) => user.id === id);
    if (userInd >= 0) {
      userDB.splice(userInd, 1);
      return true;
    }
    return false;
  }
}
