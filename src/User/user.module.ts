import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { userDB } from '../db/mockedDB';
import { v4 as uuidv4 } from 'uuid';

import {
  User,
  CreateUserDto,
  UpdatePasswordDto,
  UserToSend,
} from './user.interfaces';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {
  private passwords = [] as User[];
  constructor() {
    this.passwords = [];
  }

  getUserPasswordById(id: string): string | null {
    const user = this.passwords.find((user) => user.id === id);
    return user ? user.password : null;
  }

  private createUser(data: CreateUserDto): UserToSend {
    const user = {} as UserToSend;
    user.login = data.login;
    user.id = uuidv4();
    user.version = 1;
    user.createdAt = user.updatedAt = new Date().getTime();
    this.passwords.push({ ...data, ...user });
    return user;
  }
  addUser(user: CreateUserDto): UserToSend {
    const userData = this.createUser(user);
    userDB.push(userData);
    return userData;
  }

  getUserById(id: string): UserToSend {
    const user = userDB.find((searchUser) => searchUser.id === id);
    return user;
  }

  getUsers(): User[] {
    return userDB;
  }

  updateUser(id: string, dataDto: UpdatePasswordDto) {
    const data = userDB.find((user) => user.id === id);
    if (data) {
      const index = userDB.findIndex((user) => user.id === id);
      const updatedData = {
        ...data,
        updatedAt: new Date().getTime(),
        version: ++data.version,
      };
      const userPasswordId = this.passwords.findIndex((user) => user.id === id);
      this.passwords[userPasswordId] = {
        ...updatedData,
        password: dataDto.newPassword,
      };
      userDB[index] = updatedData;
      return updatedData;
    }
    return null;
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
