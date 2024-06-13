import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Genre } from './genre.entity';

@Entity()
export class Movie {
    /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 60, unique: true })
  title: string;

  @OneToMany(() => Genre, (genre) => genre.name)
  genre: Genre[];

  @Column({ type: 'varchar', length: 300 })
  description: string;

  @Column({ type: 'varchar', length: 40 })
  release_date: Date;
}
