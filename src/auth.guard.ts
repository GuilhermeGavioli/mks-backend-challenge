import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from './Services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService

) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.get('isPublic', context.getHandler());
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers?.authorization;
    if (authHeader){
        const token = authHeader.split(' ')[1]
        const userInfo = this.authService.verifyToken(token)
        if (!userInfo){
            throw new UnauthorizedException('Invalid Token. Please Sign in first')
        } else {
            return userInfo;
        }
    }

    const cookieToken = request.cookies?.token
    if (cookieToken){
        const userInfo = this.authService.verifyToken(cookieToken)
        if (!userInfo){
            throw new UnauthorizedException('Invalid Token. Please Sign in first')
        } else {
            return userInfo
        }
    }

    throw new UnauthorizedException('Invalid Token. Please Sign in first')

   
  }
}