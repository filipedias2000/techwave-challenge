import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGenreDto } from '../dtos/create-genre.dto';
import { Genre } from 'src/entities/genre.entity';


@Injectable()
export class GenreService {
  /**
   * Here, we have used data mapper approch for this tutorial that is why we
   * injecting repository here. Another approch can be Active records.
   */
  constructor(
    @InjectRepository(Genre) private readonly genreRepository: Repository<Genre>,
  ) {}

  /**
   * this is function is used to create Genre in Genre Entity.
   * @param createGenreDto this will type of createGenreDto in which
   * we have defined what are the keys we are expecting from body
   * @returns promise of genre
   */
  create(createGenreDto: CreateGenreDto): Promise<Genre> {
    const genre: Genre = new Genre();
    // The id is automatic
    genre.name = createGenreDto.name;
    return this.genreRepository.save(genre);
    //return 'This action adds a new genre';
  }

  /**
   * this function is used to get all the genre's list
   * @returns promise of array of genres
   */
  async findAllGenres(): Promise<Genre[]> {
    return await this.genreRepository.find();
    //return `This action returns all genre`;
  }

  /**
   * this function used to get data of use whose id is passed in parameter
   * @param id is type of number, which represent the id of genre.
   * @returns promise of genre
   */
  findOne(id: number): Promise<Genre> {
    const genreData =  this.genreRepository.findOneBy({ id });
    if (!genreData) {
      throw new HttpException('Genre Not Found', 404);
    }
    return genreData;
  }

  async remove(name: string): Promise<Genre> {
    const existingGenre = await this.genreRepository.findOneBy({name: name}); 
    return await this.genreRepository.remove(
      existingGenre,
    );
  }
}

// Error:Type 'Genre[]' is missing the following properties from type 'Genre': id, namets(2739)

// My view: An array of Genre[] does not have the property id from the type Genre

// Outshot: We could also try to remove by ID instead of name

//console.log(remove("Test Genre"));
