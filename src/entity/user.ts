import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Tag } from './tag';
import { Article } from './article';

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

    @OneToMany(type => Tag, tag => tag.user)
    tags: Tag[];

    @OneToMany(type => Article, article => article.user)
    articles: Article[];

    @CreateDateColumn()
    creat_at: Date;
}
