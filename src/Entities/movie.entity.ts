import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Movie {
    @PrimaryGeneratedColumn('increment')
    id: number;

  @Column({ unique: true })
  title: string;

  @Column()
  description: string;

  @Column()
  year: number; 
  
    @Column()
    genre: string;

    @Column()
    director: string;
    @Column()
    rated: string;

}