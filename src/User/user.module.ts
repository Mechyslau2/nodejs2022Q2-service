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
import { Users } from './user.entity';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {
  private passwords = [] as User[];
  constructor(
    @InjectRepository(Users) private userRepository: Repository<User>,
  ) {
    this.passwords = [];
  }

  getUserPasswordById(id: string): string | null {
    const user = this.passwords.find((user) => user.id === id);
    return user ? user.password : null;
  }

  private createUser(data: CreateUserDto): User {
    const user = {} as User;
    user.login = data.login;
    user.password = data.password;
    user.version = 1;
    user.createdAt = user.updatedAt = new Date().getTime();
    console.log(typeof Date.now())
    this.passwords.push({ ...data, ...user });
    return user;
  }
  addUser(user: CreateUserDto): Observable<UserToSend> {
    const userData = this.createUser(user);
    console.log(userData);
    return from(this.userRepository.save(userData));
  }

  getUserById(id: string): UserToSend {
    const user = userDB.find((searchUser) => searchUser.id === id);
    return user;
  }

  getUsers(): Observable<User[]> {
    return from(this.userRepository.find());
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
