import { Module } from '@nestjs/common';
import { MovieService } from './services/movie.service';
import { MovieController } from './controllers/movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from 'src/entities';


@Module({
  imports: [
    TypeOrmModule.forFeature([Movie]),
  ],
  controllers: [MovieController],
  providers: [MovieService],
  
})
export class MovieModule {}
