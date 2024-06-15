import {
    IsNotEmpty, 
    MinLength
} from "class-validator"; 
import { Genre } from "src/entities";

export class CreateMovieDto {
    @IsNotEmpty()
    @MinLength(3)
    title: string;

    @IsNotEmpty()
    @MinLength(3)
    description: string;
    
    @IsNotEmpty()
    @MinLength(3)
    release_date: Date;

    @IsNotEmpty()
    @MinLength(1)
    genre: Genre[]; // Check this later with the array
}
