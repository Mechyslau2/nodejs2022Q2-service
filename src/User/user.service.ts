import { Injectable } from '@nestjs/common';
import { UserModule } from './user.module';
import { validate, version } from 'uuid';
import { CreateUserDto, UpdatePasswordDto, User } from './user.interfaces';
import { ErrorHandler } from 'src/errors/ErrorHandler';

@Injectable()
export class UserService {
  private _user: UserModule;

  constructor() {
    this._user = new UserModule();
  }

  private checkId(id: string): boolean {
    return validate(id) && version(id) === 4;
  }

  getUserById(id: string): User | ErrorHandler {
    if (!this.checkId(id)) {
      return new ErrorHandler({
        code: 400,
        message: "it ins't valid id",
      });
    }
    const user = this._user.getUserById(id);
    if (!user) {
      return new ErrorHandler({
        code: 404,
        message: 'User not found',
      });
    }
    return user;
  }

  getAllUsers(): User[] {
    return this._user.getUsers();
  }

  updatePasswordDto(id: string, data: UpdatePasswordDto) {
    if (!data?.newPassword?.trim() || !data?.oldPassowrd?.trim()) {
      return new ErrorHandler({
        code: 400,
        message: 'Should fill all required fields',
      });
    }
    return this._user.updateUser(id, data);
  }

  createUser(data: CreateUserDto) {
    if (!data?.login?.trim() || !data?.password?.trim()) {
      return new ErrorHandler({
        code: 404,
        message: 'Should fill all required fields',
      });
    }
    return this._user.addUser(data);
  }

  deleteUser(id: string) {
    if (!this.checkId(id)) {
      return new ErrorHandler({
        code: 400,
        message: "it ins't valid id",
      });
    }
    const data = this._user.deleteUser(id);
    if (!data) {
      return new ErrorHandler({
        code: 404,
        message: 'User not found',
      });
    }
  }
}
