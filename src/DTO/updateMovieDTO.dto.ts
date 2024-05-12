import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsNumber, IsInt, Min, Max, IsOptional} from 'class-validator';

export class updateMovieDTO {

    @ApiProperty({
        example: 'Fight Club'
    })
@IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(40)
  readonly title: string;

    @ApiProperty({
        example: 'Um homem deprimido que sofre de insônia conhece um estranho vendedor chamado Tyler Durden e se vê morando em uma casa suja depois que seu...'
    })
  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(200)
  readonly description: string;

    @ApiProperty({
        example: 1999
    })
  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(1900)
  @Max(2025)
  readonly year: number;

    @ApiProperty({
        example: 'Suspense/Crime'
    })
  @IsOptional()
  @IsString()
  @MinLength(4) 
  @MaxLength(30)
  readonly genre: string

    @ApiProperty({
        example: 'David Fincher'
    })
  @IsOptional()
  @IsString()
  @MinLength(6)  
  @MaxLength(40)
  readonly director: string

    @ApiProperty({
        example: 'PG-13'
    })
  @IsOptional()
  @IsString()
  @MinLength(1) 
  @MaxLength(5)
  readonly rated: string  // "G", "PG", "PG-13","NC-17" "R"
}