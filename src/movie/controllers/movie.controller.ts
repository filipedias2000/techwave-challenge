import { 
  Controller, 
  DefaultValuePipe,
  Query,
  Get, 
  ParseIntPipe,
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete,
  HttpException,
  HttpStatus,
 } from '@nestjs/common';
import { MovieService } from '../services/movie.service';
import { CreateMovieDto } from '../dtos/create-movie.dto';
import { UpdateMovieDto } from '../dtos/update-movie.dto';
import { 
  paginate, 
  Pagination, 
  IPaginationOptions 
} from 'nestjs-typeorm-paginate';
import { Movie } from 'src/entities';

/**
 * whatever the string pass in controller decorator it will be appended to
 * API URL. to call any API from this controller you need to add prefix which is
 * passed in controller decorator.
 * in our case our base URL is http://localhost:3000/movies
 */
@Controller('/movies')
export class MovieController {
  constructor(
    private readonly movieService: MovieService,
  ) {}

  /**
   * Post decorator represents method of request as we have used post decorator the method
   * of this API will be post.
   * so the API URL to create Movie will be
   * POST http://localhost:3000/movies/addMovie
   */
  @Post('addMovie')
  async addMovie(
    @Body() createMovieDto: CreateMovieDto,
  ) {
    try {
      await this.movieService.create(
        createMovieDto,
      );
      return {
        success: true,
        message: 'Movie Created Successfully',
      }; 
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  /**
   * we have used get decorator to get all the movies's list
   * so the API URL will be
   * GET http://localhost:3000/movies
   */
  @Get('')
  async listMovies(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<Movie>> {
    try {
      const data = 
      await this.movieService.paginate({
        page,
        limit,
      });
      return data;
    } catch (error) {
      throw new HttpException({
        success: false,
        message: error.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  
   /**
   * we have used patch decorator with id param to get id from request
   * so the API URL will be
   * PATCH http://localhost:3000/movies/:id
   */
  @Patch(':id')
  async updateMovie(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    try {
      await this.movieService.update(
        +id,
        updateMovieDto,
      );
      return {
        success: true,
        message: 'Movie Updated Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  /**
   * we have used Delete decorator with id param to get id from request
   * so the API URL will be
   * DELETE http://localhost:3000/movies/:title
   */
  @Delete(':title')
  async deleteMovie(@Param('title') title: string) {
    try {
      await this.movieService.remove(title);
      return {
        success: 'Movie Deleted Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  /**
   * we have used Get decorator with title and genre param to get movies by title or genre from request
   * so the API URL will be
   * DELETE http://localhost:3000/movies/search
   */
  @Get('search')
  async searchMovies(
    @Query('title') title: string, 
    @Query('genre') genre: string,
  ) {
    try {
      const movies = await this.movieService.searchMovies(title, genre);
      return {
        success: true,
        data: movies,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
  
