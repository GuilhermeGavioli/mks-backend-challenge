import { Injectable  } from '@nestjs/common';
import {sign, verify} from 'jsonwebtoken';
 
@Injectable()
export class AuthService {
  private readonly secret: string = process.env.JWT_SECRET;

  signToken(payload: any): string {
    return sign(payload, this.secret);
  }

  verifyToken(token: string): any {
    return verify(token, this.secret);
  }

  getCookiesOptions(): any{
    return {
        httpOnly: false, // for testing
        secure: false,
        maxAge: 3600000, // 1 hour
      };
  }
}