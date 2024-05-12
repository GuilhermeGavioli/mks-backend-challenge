import { BadRequestException, Body, Controller, Post, ValidationPipe, UsePipes, Res, HttpStatus  } from '@nestjs/common';
import { UserService } from '../Services/user.service';
import { AuthService } from '../Services/auth.service';
import { SignUpDTO } from '../DTO/signup.dto';
import { ApiTags } from '@nestjs/swagger';
import {Response} from 'express'
import { HashService } from 'src/Services/hash.service';
import {ApiOkResponse} from '@nestjs/swagger'
import { userSchema } from 'src/schemas';
import { ZodValidationPipe } from 'nestjs-zod';

@Controller()
export class UserController {
  constructor(
     private readonly userService: UserService,
     private readonly authService: AuthService,
     private readonly hashService: HashService
    ) {}

    @ApiTags('users')
    @ApiOkResponse({ description: 'Note: Token is (sent in the body) also stored in the cookies so you can call the other protected endpoints without managing auth header options.' })
    @UsePipes(new ValidationPipe({ transform: false }))
    @Post('signin')
    async login(
      @Body(new ZodValidationPipe(userSchema)) signinDTO: SignUpDTO,
      @Res({ passthrough: true }) response: Response
    
    ): Promise<any>{

      const {username, password} = signinDTO;
      const found_user = await this.userService.findOne(username)
      if (!found_user) {
        throw new BadRequestException('User does not exists in our db');
      } else {
        const passwords_match = await this.hashService.comparePassword(password, found_user.password)
        console.log(passwords_match)
        if (!passwords_match){
          throw new BadRequestException('Passwords do not match.');
        } else {
          const token = this.authService.signToken({id: found_user.id, username})
          const cookieOptions = this.authService.getCookiesOptions()
          response.cookie('token', token, cookieOptions);
          HttpStatus.CREATED
          return {ok: true, token}
        }
      }
    }

    @ApiTags('users')
    @UsePipes(new ValidationPipe({ transform: false }))
    @Post('signup')
    async signup(@Body(new ZodValidationPipe(userSchema)) signupDTO: SignUpDTO): Promise<any>{
   
      const {username, password} = signupDTO;
      const user_exists = await this.userService.findOne(username)
      if (user_exists){
        throw new BadRequestException('User already exists');
      } else {
        const hashed_password = await this.hashService.hashPassword(password)
        await this.userService.insert(username, hashed_password)
        HttpStatus.CREATED
        return {ok: true}
      }
    }

}
