import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user';

@Entity()
export class Tag {

    @PrimaryGeneratedColumn()
    id: number;

    // TODO 测试ManyToOne
    @ManyToOne(type => User, user => user.tags)
    user: User;

    @Column({ unique: true })
    name: string;

    @Column({ default: 0 })
    count: number;

    @CreateDateColumn()
    creat_at: Date;
}
