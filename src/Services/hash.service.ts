import {genSalt, hash, compare} from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HashService {
  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    return await hash(password, salt);
  }

  async comparePassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    return await compare(plainTextPassword, hashedPassword);
  }
}