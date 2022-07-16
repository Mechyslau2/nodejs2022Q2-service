export class ErrorHandler {
  code: number;
  message: string;

  constructor({ message, code }) {
    this.message = message;
    this.code = code;
  }
}
