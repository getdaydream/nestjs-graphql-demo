import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'varchar',  length: 100, unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    // File
    avatar: string;

    @CreateDateColumn()
    creat_at: Date;
}
