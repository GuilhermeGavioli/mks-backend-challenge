import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class SignUpDTO {

  @ApiProperty({
    description: 'Unique field. length = (min 3 / max 20)'
  })
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  readonly  username: string;

  @ApiProperty({
    description: 'length = (min 6 / max 50)'
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  readonly  password: string;
 
}