
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength} from 'class-validator';

export class AuthHeaderDTO {

    @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  readonly authorization: string;
}