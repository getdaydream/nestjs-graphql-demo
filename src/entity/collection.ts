import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Collection {

    @PrimaryGeneratedColumn()
    id: number;

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
