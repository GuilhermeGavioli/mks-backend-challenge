import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Movie } from '../Entities/movie.entity';
import { CreateMovieDTO } from 'src/DTO/createMovie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}


  async insert(movie: CreateMovieDTO): Promise<InsertResult> {
    return await this.movieRepository.insert(movie)
  }

  async findOneById(id: number): Promise<Movie | undefined> {
    return await this.movieRepository.findOneBy({id});
  }

  async findOneByTitle(title: string): Promise<Movie | undefined> {
    return await this.movieRepository.findOneBy({title: title});
  }

  async findMany(page: number): Promise<Movie[] | undefined> {
    const PAGE_SIZE = 10
    const skip = (page - 1) * PAGE_SIZE;
    const take = PAGE_SIZE;

    const [movies, total] = await this.movieRepository.findAndCount({
      skip,
      take,
    });
    return movies;
  }

  async updateMovie(id: number, movie: CreateMovieDTO): Promise<UpdateResult> {
    return await this.movieRepository.update({id: id}, movie);
  }

  async deleteOne(id: number): Promise<DeleteResult> {
    return await this.movieRepository.delete({id});
  }

}