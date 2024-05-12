import { BadRequestException, Body, Controller, Get, Param, Post,Delete, ValidationPipe, UseGuards, Put, UseInterceptors, UsePipes } from '@nestjs/common';
import { CreateMovieDTO } from '../DTO/createMovie.dto';
import { AuthGuard } from '../auth.guard';
import { MovieService } from '../Services/movie.service';
import { Movie } from '../Entities/movie.entity';
import { updateMovieDTO } from '../DTO/updateMovieDTO.dto';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod';
import { IDsSchema, createMovieSchema, movieAttributeSchema, pageSchema, updateMovieSchema } from 'src/schemas';

// ApiImplicitParam
@Controller()
@UseGuards(AuthGuard)
export class MovieController {
  constructor(
     private readonly movieService: MovieService,
    ) {}

    @ApiTags('movies')
    @UsePipes(new ValidationPipe({ transform: false }))
    @Post('movies/create')
    async createMovie(@Body(new ZodValidationPipe(createMovieSchema)) createMovieDTO: CreateMovieDTO): Promise<any>{
        const title_exists = await this.movieService.findOneByTitle(createMovieDTO.title)
        if (title_exists){
            throw new BadRequestException(`Movie Title has already been registered. it's id is ${title_exists.id}`);
        }
        const inserted = await this.movieService.insert(createMovieDTO)
        if (!inserted) {
        throw new BadRequestException('Error during insertion. Please try again.');
        } else {
        return {ok: true}
        }
    }

    @ApiTags('movies')
    @ApiParam({
        name: 'id',
        type: 'string',
    })
    @UsePipes(new ValidationPipe({ transform: false }))
    @UseInterceptors(CacheInterceptor)
    @CacheTTL(60000)
    @Get('movies/:id')
    async getMovie(@Param('id', new ZodValidationPipe(IDsSchema)) id: string): Promise<Movie | null>{
        const movie = await this.movieService.findOneById(Number(id));
        return movie;
    }

    @ApiTags('movies')
    @ApiParam({
        name: 'id',
        type: 'string',
    })
    @ApiParam({
        name: 'movie_attribute',
        type: 'string',
    })
    @UsePipes(new ValidationPipe({ transform: false }))
    @UseInterceptors(CacheInterceptor)
    @CacheTTL(60000)
    @Get('movies/:id/:movie_attribute')
    async getMovieDescription(
        @Param('id', new ZodValidationPipe(IDsSchema)) id: string, 
        @Param('movie_attribute', new ZodValidationPipe(movieAttributeSchema)) movie_attribute: string
    ): Promise<string | number | null>{
        const movie = await this.movieService.findOneById(Number(id));
        if (movie){
            return movie[movie_attribute];
        }
        return null
    }


    @ApiTags('movies')
    @ApiParam({
        name: 'page',
        type: 'string',
    })
    @UsePipes(new ValidationPipe({ transform: false }))
    @UseInterceptors(CacheInterceptor)
    @CacheTTL(60000)
    @Get('allmovies/:page')
    async getMovies(@Param('page', new ZodValidationPipe(pageSchema)) page: string): Promise<Movie[] | null>{
        const movies = await this.movieService.findMany(Number(page));
        return movies
    }


    @ApiTags('movies')
    @ApiParam({
        name: 'id',
        type: 'string',
    })
    @UsePipes(new ValidationPipe({ transform: false }))
    @Put('movies/update/:id')
    async updateMovie(
        @Body(new ZodValidationPipe(updateMovieSchema)) updateMovie: updateMovieDTO,
        @Param('id', new ZodValidationPipe(IDsSchema)) id: string
    ): Promise<any> {
        const isUpdateObjEmpty = Object.keys(updateMovie).length > 0;
        if (isUpdateObjEmpty) {
            throw new BadRequestException('No fields for update were provided');
        } else {
            const updated = await this.movieService.updateMovie(Number(id), updateMovie);
            if (!updated){
                throw new BadRequestException('Error during update. Please try again.');
            } else {
                return {ok: true}
            }
        }
    }

    @ApiTags('movies')
    @ApiParam({
        name: 'id',
        type: 'string',
    })
    @UsePipes(new ValidationPipe({ transform: false }))
    @Delete('movies/delete/:id')
    async deleteMovie(@Param('id', new ZodValidationPipe(IDsSchema)) id: string): Promise<any>{
        const deleted = await this.movieService.deleteOne(Number(id));
        if (!deleted){
            throw new BadRequestException('Error during insertion. Please try again.');
          } else {
            return {ok: true}
        }
    }



}
