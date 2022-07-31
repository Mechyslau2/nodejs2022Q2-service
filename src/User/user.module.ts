import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

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
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<User>,
  ) {}

  private createUser(data: CreateUserDto): User {
    const user = {} as User;
    user.login = data.login;
    user.password = data.password;
    user.version = 1;
    user.createdAt = user.updatedAt = new Date().getTime();
    return user;
  }

  private userToSend({ login, id, version, createdAt, updatedAt }): UserToSend {
    return {
      login,
      id,
      version,
      createdAt: Number(createdAt),
      updatedAt: Number(updatedAt),
    };
  }

  async getUserPasswordById(userId: string): Promise<User> {
    return await this.userRepository.findOneBy({ id: userId });
  }

  async addUser(user: CreateUserDto): Promise<UserToSend> {
    const userData = this.createUser(user);
    const createdUser = await this.userRepository.save(userData);
    return this.userToSend(createdUser);
  }

  async getUserById(userId: string): Promise<UserToSend | null> {
    const user = await this.userRepository.findOneBy({ id: userId });
    return user ? user : null;
  }

  getUsers(): Observable<UserToSend[]> {
    return from(
      this.userRepository
        .find()
        .then((res) => res.map((user) => this.userToSend(user))),
    );
  }

  async updateUser(
    userId: string,
    dataDto: UpdatePasswordDto,
  ): Promise<UserToSend | null> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (user && user?.password === dataDto.oldPassword) {
      const updatedUserData = {
        ...user,
        updatedAt: new Date().getTime(),
        version: ++user.version,
        password: dataDto.newPassword,
      };
      const updatedUser = await this.userRepository.save({
        id: userId,
        ...updatedUserData,
      });
      return this.userToSend(updatedUser);
    }
    return null;
  }

  async deleteUser(userId: string): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) return false;
    return await !!this.userRepository
      .createQueryBuilder()
      .delete()
      .where({ id: userId })
      .execute();
  }
}
