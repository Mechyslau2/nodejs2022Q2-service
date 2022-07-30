import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserModule } from './user.module';
import { validate, version } from 'uuid';
import {
  CreateUserDto,
  UpdatePasswordDto,
  User,
  UserToSend,
} from './user.interfaces';
import { ErrorHandler } from 'src/errors/ErrorHandler';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => UserModule)) private userModule: UserModule,
  ) {}

  private checkId(id: string): boolean {
    return validate(id) && version(id) === 4;
  }

  async getUserById(id: string): Promise<UserToSend | ErrorHandler> {
    if (!this.checkId(id)) {
      return new ErrorHandler({
        code: 400,
        message: "it ins't valid id",
      });
    }
    const user = await this.userModule.getUserById(id);
    if (!user) {
      return new ErrorHandler({
        code: 404,
        message: 'User not found',
      });
    }
    return user;
  }

  getAllUsers(): Observable<UserToSend[]> {
    return this.userModule.getUsers();
  }

  async updatePasswordDto(
    id: string,
    data: UpdatePasswordDto,
  ): Promise<UserToSend | ErrorHandler> {
    if (!this.checkId(id)) {
      return new ErrorHandler({
        code: 400,
        message: "it ins't valid id",
      });
    }
    if (!data?.newPassword?.trim() || !data?.oldPassword?.trim()) {
      return new ErrorHandler({
        code: 400,
        message: 'Should fill all required fields',
      });
    }
    const userData = await this.userModule.getUserPasswordById(id);

    if (!userData?.password) {
      return new ErrorHandler({
        code: 404,
        message: 'User not found',
      });
    }
    if (userData?.password !== data?.oldPassword) {
      return new ErrorHandler({
        code: 403,
        message: 'Old password is wrong',
      });
    }
    const user = await this.userModule.updateUser(id, data);
    return user;
  }

  async createUser(data: CreateUserDto): Promise<UserToSend | ErrorHandler> {
    if (!data?.login?.trim() || !data?.password?.trim()) {
      return new ErrorHandler({
        code: 404,
        message: 'Should fill all required fields',
      });
    }
    return await this.userModule.addUser(data);
  }

  async deleteUser(id: string): Promise<ErrorHandler | void> {
    if (!this.checkId(id)) {
      return new ErrorHandler({
        code: 400,
        message: "it ins't valid id",
      });
    }
    const data = await this.userModule.deleteUser(id);
    if (!data) {
      return new ErrorHandler({
        code: 404,
        message: 'User not found',
      });
    }
  }
}
