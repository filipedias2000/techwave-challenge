import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from '../dtos/create-movie.dto';
import { Movie } from 'src/entities';
import { UpdateMovieDto } from '../dtos/update-movie.dto';

//import { UpdateMovieDto } from './dtos/update-movie.dto';

@Injectable()
export class MovieService {
   /**
   * Here, we have used data mapper approch for this tutorial that is why we
   * injecting repository here. Another approch can be Active records.
   */
   constructor(
    @InjectRepository(Movie) private readonly movieRepository: Repository<Movie>,
  ) {}

  /**
   * this is function is used to create Movie in Movie Entity.
   * @param createMovieDto this will type of createMovieDto in which
   * we have defined what are the keys we are expecting from body
   * @returns promise of movie
   */
  async create(createMovieDto: CreateMovieDto): Promise<Movie> { 
    return await this.movieRepository.save(createMovieDto);
  }

  /**
   * this function is used to get all the movie's list
   * @returns promise of array of movies
   */
  async findAllMovies(): Promise<Movie[]> {
    return await this.movieRepository.find();
   //return `This action returns all movie`;
  }

  /**
   * this function used to get data of use whose id is passed in parameter
   * @param id is type of number, which represent the id of movie.
   * @returns promise of movie
   */
  async findOne(id: number): Promise<Movie> {
    const movieData = await this.movieRepository.findOneBy({ id });
    if(!movieData) {
      throw new HttpException('Movie Not Found', 404);
    }
    return movieData;
    //return `This action returns a #${id} movie`;
  }

  /**
   * this function is used to updated specific movie whose id is passed in
   * parameter along with passed updated data
   * @param id is type of number, which represent the id of movie.
   * @param updateMovieDto this is partial type of createMovieDto.
   * @returns promise of udpate movie
   */
  async updateMovie(
    id: number, 
    updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const existingMovie = await this.findOne(id);
    const movieData = this.movieRepository.merge(existingMovie, updateMovieDto);
    return await this.movieRepository.save(movieData);
    //return `This action updates a #${id} movie`;
  }

  /**
   * this function is used to remove or delete movie from database.
   * @param id is the type of number, which represent id of movie
   * @returns number of rows deleted or affected
   */
  async removeMovie(id: number): Promise<Movie> {
    const existingMovie = await this.findOne(id);
    return await this.movieRepository.remove(existingMovie);
    // return `This action removes a #${id} movie`;
  }
}
