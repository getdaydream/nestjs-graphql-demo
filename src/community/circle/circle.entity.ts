import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Circle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  aka: string;

  @Column()
  logo: string;
}
