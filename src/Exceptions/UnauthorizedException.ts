import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class UnauthorizedException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}