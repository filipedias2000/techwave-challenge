import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Genre {
    /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
    name: 'id',
  })
  id: number;
  
  @Column({ type: 'varchar', length: 30 })
  name: string;
}

