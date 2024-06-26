import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreModule } from './genre/genre.module';
import { MovieModule } from './movie/movie.module';
import entities from './entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'Renovatio0!',
      username: 'postgres',
      entities: entities, // here we have added movie and genre entity in entities array
      database: 'movie_api', 
      synchronize: true,
      logging: true,
    }),
    GenreModule,
    MovieModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
