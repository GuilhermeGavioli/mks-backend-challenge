import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsNumber, IsInt, Min, Max} from 'class-validator';

export class CreateMovieDTO {

    @ApiProperty()
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    readonly title: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @MaxLength(350)
  readonly description: string;

  @ApiProperty()
  @IsNumber()
  @IsInt()
  @Min(1900)
  @Max(2025) 
  readonly year: number;

  @ApiProperty()
  @IsString()
  @MinLength(4) 
  @MaxLength(30)
  readonly genre: string

  @ApiProperty()
  @IsString()
  @MinLength(6)  
  @MaxLength(40)
  readonly director: string

  @ApiProperty()
  @IsString()
  @MinLength(1) 
  @MaxLength(5)
  readonly rated: string  // "G", "PG", "PG-13","NC-17" "R"
}

