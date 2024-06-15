import {
  Entity, 
  PrimaryGeneratedColumn,
  Column,
 } from 'typeorm';

@Entity()
export class Genre {
    /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
    //name: 'id',
  })
  id: number;
  
  @Column({ type: 'varchar', length: 30, unique: true })
  name: string;
}

