import {
  Entity, 
  PrimaryGeneratedColumn, 
  Column,
  ManyToMany,
  JoinTable,
 } from 'typeorm';
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

  @ManyToMany(() => Genre, (genre) => genre.name)
  @JoinTable()
  genre: Genre[];

  @Column({ type: 'varchar', length: 300 })
  description: string;

  @Column({ type: 'varchar', length: 40 })
  release_date: Date;
}

