import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {

  @PrimaryGeneratedColumn('increment')
  id: number;
  
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

}