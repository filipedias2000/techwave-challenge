import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete,
 } from '@nestjs/common';
import { MovieService } from '../services/movie.service';
import { CreateMovieDto } from '../dtos/create-movie.dto';
import { UpdateMovieDto } from '../dtos/update-movie.dto';

/**
 * whatever the string pass in controller decorator it will be appended to
 * API URL. to call any API from this controller you need to add prefix which is
 * passed in controller decorator.
 * in our case our base URL is http://localhost:3000/user
 */
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  /**
   * Post decorator represents method of request as we have used post decorator the method
   * of this API will be post.
   * so the API URL to create User will be
   * POST http://localhost:3000/user
   */
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  /**
   * we have used get decorator to get all the user's list
   * so the API URL will be
   * GET http://localhost:3000/user
   */
  @Get()
  findAll() {
    return this.movieService.findAllMovies();
  }

  /**
   * we have used get decorator with id param to get id from request
   * so the API URL will be
   * GET http://localhost:3000/user/:id
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(+id);
  }

   /**
   * we have used patch decorator with id param to get id from request
   * so the API URL will be
   * PATCH http://localhost:3000/user/:id
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.updateMovie(+id, updateMovieDto);
  }

  /**
   * we have used Delete decorator with id param to get id from request
   * so the API URL will be
   * DELETE http://localhost:3000/user/:id
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieService.removeMovie(+id);
  }
}
