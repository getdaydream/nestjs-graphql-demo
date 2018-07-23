import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 10 })
    name: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    creat_at: Date;
}
