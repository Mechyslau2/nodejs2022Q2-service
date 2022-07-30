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

  getUserById(id: string): UserToSend | ErrorHandler {
    if (!this.checkId(id)) {
      return new ErrorHandler({
        code: 400,
        message: "it ins't valid id",
      });
    }
    const user = this.userModule.getUserById(id);
    if (!user) {
      return new ErrorHandler({
        code: 404,
        message: 'User not found',
      });
    }
    return user;
  }

  getAllUsers(): Observable<User[]> {
    return this.userModule.getUsers();
  }

  updatePasswordDto(id: string, data: UpdatePasswordDto) {
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
    const password = this.userModule.getUserPasswordById(id);
    if (!password) {
      return new ErrorHandler({
        code: 404,
        message: 'User not found',
      });
    }
    if (password !== data?.oldPassword) {
      return new ErrorHandler({
        code: 403,
        message: 'Old password is wrong',
      });
    }
    const user = this.userModule.updateUser(id, data);
    return user;
  }

  createUser(data: CreateUserDto) {
    if (!data?.login?.trim() || !data?.password?.trim()) {
      return new ErrorHandler({
        code: 404,
        message: 'Should fill all required fields',
      });
    }
    return this.userModule.addUser(data);
  }

  deleteUser(id: string) {
    if (!this.checkId(id)) {
      return new ErrorHandler({
        code: 400,
        message: "it ins't valid id",
      });
    }
    const data = this.userModule.deleteUser(id);
    if (!data) {
      return new ErrorHandler({
        code: 404,
        message: 'User not found',
      });
    }
  }
}
