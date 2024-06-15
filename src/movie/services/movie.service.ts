import { 
  HttpException, 
  Injectable,
} from '@nestjs/common';
import { CreateMovieDto } from '../dtos/create-movie.dto';
import { UpdateMovieDto } from '../dtos/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from 'src/entities';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class MovieService {

   constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  /**
   * this is function is used to create Movie in Movie Entity.
   * @param createMovieDto this will type of createMovieDto in which
   * we have defined what are the keys we are expecting from body
   * @returns promise of movie
   */
  async create(
    createMovieDto: CreateMovieDto,
  ): Promise<Movie> { 
    const movieData = 
      await this.movieRepository.create(
        createMovieDto,
      );
      return this.movieRepository.save(movieData);
  }

  /**
   * this function is used to get all the movie's list
   * @returns promise of array of movies
   */
  async paginate(options: IPaginationOptions): Promise<Pagination<Movie>> {
    return paginate<Movie>(this.movieRepository, options);
  }

  /**
   * this function used to get data of use whose id is passed in parameter
   * @param id is type of number, which represent the id of movie.
   * @returns promise of movie
   */
  async findOne(id: number): Promise<Movie> {
    const movieData = 
      await this.movieRepository.findOneBy({ id });
    if(!movieData) {
      throw new HttpException(
        'Movie Not Found', 
        404,
      );
    }
    return movieData;
  }

  /**
   * this function is used to updated specific movie whose id is passed in
   * parameter along with passed updated data
   * @param id is type of number, which represent the id of movie.
   * @param updateMovieDto this is partial type of createMovieDto.
   * @returns promise of udpate movie
   */
  async update(
    id: number, 
    updateMovieDto: UpdateMovieDto,
  ): Promise<Movie> {
    const existingMovie = await this.findOne(id);
    const movieData = this.movieRepository.merge(
      existingMovie,
      updateMovieDto,
    );
    return await this.movieRepository.save(
      movieData,
    );
  }

  async remove(title: string) {
    await this.movieRepository
    .createQueryBuilder()
    .delete()
    .from(Movie)
    .where("title = :title", {title: title})
    .execute()
   
  }

  async searchMovies(
    title: string, 
    genre: string,
  ): Promise<Movie[]> {
    const query = this.movieRepository.createQueryBuilder('movie');
    
    if (title) {
      query.andWhere(
        'movie.title ILIKE :title', 
        { title: `%${title}%` }
      );
    }
    if (genre) {
      query.andWhere(
        'movie.genre ILIKE :genre', 
        { genre: `%${genre}%` }
      );
    }
    
    const movies = await query.getMany();
    if (!movies.length) {
      throw new HttpException(
        'No Movies Found',
         404,
        );
    }
    return movies;
  }
}

