import { Module } from '@nestjs/common';
import { GenreService } from './services/genre.service';
import { GenreController } from './controllers/genre.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from 'src/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Genre]),
  ],
  controllers: [GenreController],
  providers: [GenreService]
})
export class GenreModule {}
