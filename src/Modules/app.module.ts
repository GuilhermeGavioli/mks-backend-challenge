import { Module } from '@nestjs/common';
import { AppController } from '../Controllers/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../../typeorm.config';
import { UserService } from '../Services/user.service';
import { User } from '../Entities/user.entity';
import { AuthService } from '../Services/auth.service';
import { MovieService } from '../Services/movie.service';
import { Movie } from '../Entities/movie.entity';
import { MovieController } from '../Controllers/movie.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { UserController } from 'src/Controllers/user.controller';
import { HashService } from 'src/Services/hash.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from 'src/Services/task.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Movie]),
    TypeOrmModule.forRoot(typeOrmConfig),
    CacheModule.register(),
    ScheduleModule.forRoot()
  ],
  controllers: [AppController, UserController, MovieController],
  providers: [UserService, MovieService, AuthService, HashService, TasksService],
})
export class AppModule {}
