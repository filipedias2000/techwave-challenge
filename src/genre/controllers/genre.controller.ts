import { 
  Controller,
  Get,
  Post, 
  Body, 
  Param, 
  Delete,
 } from '@nestjs/common';
import { GenreService } from '../services/genre.service';
import { CreateGenreDto } from '../dtos/create-genre.dto';

/**
 * whatever the string pass in controller decorator it will be appended to
 * API URL. to call any API from this controller you need to add prefix which is
 * passed in controller decorator.
 * in our case our base URL is http://localhost:3000/genre
 */
@Controller('/genre')
export class GenreController {
  constructor(
    private readonly genreService: GenreService,
  ) {}

   /**
   * Post decorator represents method of request as we have used post decorator the method
   * of this API will be post.
   * so the API URL to create Genre will be
   * POST http://localhost:3000/genre
   */
  @Post('addGenre')
  async addGenre(
    @Body() createGenreDto: CreateGenreDto,
  ) {
    try{
      await this.genreService.create(
        createGenreDto,
      );
      return {
        sucess: true,
        message: 'Genre Created Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  /**
   * we have used get decorator to get all the genre's list
   * so the API URL will be
   * GET http://localhost:3000/genre
   */
  @Get()
  async listGenres() {
    try {
      const data =  await this.genreService.findAll();
      return {
        success: true,
        data,
        message: 'Genre Fetched Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Delete(':name')
  async deleteGenre(@Param('name') name: string)  {
    try { 
      await this.genreService.remove(name);
      return {
        success: true,
        message: 'Genre Deleted Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  } 
}
