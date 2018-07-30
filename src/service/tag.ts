import { getRepository } from 'typeorm';
import { Tag } from '../entity';

export const tagService = {
    async findAll(): Promise<Tag[]> {
        const tagRepo = getRepository(Tag);
        const tags = await tagRepo.find();
        return tags;
    },
    async findById(id: number): Promise<Tag> {
        const tagRepo = getRepository(Tag);
        const tags = await tagRepo.findByIds([id]);
        return tags.length ? tags[0] : null;
    },
    async tagExists(name): Promise<boolean> {
        const tagRepo = getRepository(Tag);
        const tags = await tagRepo.find({ name });
        return tags.length ? true : false;
    },
};
