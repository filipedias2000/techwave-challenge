import { 
  HttpException,
  Injectable,
} from '@nestjs/common';
import { CreateGenreDto } from '../dtos/create-genre.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from 'src/entities/genre.entity';

@Injectable()
export class GenreService {

  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  /**
   * this is function is used to create Genre in Genre Entity.
   * @param createGenreDto this will type of createGenreDto in which
   * we have defined what are the keys we are expecting from body
   * @returns promise of genre
   */
  async create(
    createGenreDto: CreateGenreDto,
  ): Promise<Genre> {
    const genreData =
    await this.genreRepository.create(
      createGenreDto,
    );
    return this.genreRepository.save(genreData);
  }

  /**
   * this function is used to get all the genre's list
   * @returns promise of array of genres
   */
  async findAll(): Promise<Genre[]> {
    return await this.genreRepository.find();
  }

  /**
   * this function used to get data of use whose id is passed in parameter
   * @param id is type of number, which represent the id of genre.
   * @returns promise of genre
   */
  async findOne(id: number): Promise<Genre> {
    const genreData =  
      await this.genreRepository.findOneBy({ id });
    if (!genreData) {
      throw new HttpException(
        'Genre Not Found', 
        404,
      );
    }
    return genreData;
  }

  async remove(name: string) {
    await this.genreRepository
    .createQueryBuilder()
    .delete()
    .from(Genre)
    .where("name = :name", { name: name })
    .execute()
  }
}


