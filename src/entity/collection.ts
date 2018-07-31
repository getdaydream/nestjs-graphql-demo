import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { Post } from './post';

@Entity()
export class Collection extends Post {
    @Column()
    status: 'todo' | 'doing' | 'done';

    @Column()
    // 操作的时间
    action: Date;

    @Column()
    category: string;

    @Column()
    tags: string;

    @CreateDateColumn()
    creat_at: Date;
}
