import { Tag } from '../entity';
import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { tagService } from 'service/tag';

export const tagController = {
    async create(ctx) {
        const { name } = ctx.request.body;
        if (await tagService.tagExists(name)) {
            return ctx.body = {
                error: 'duplicate tag name',
            };
        }
        const tagRepo = getRepository(Tag);
        const tag = tagRepo.create({ name });
        try {
            const res = await tagRepo.save(tag);
            ctx.body = {
                tag: res,
            };
        } catch (e) {
            console.log(e);
        }
    },
    async find(ctx: Context) {
        const { id } = ctx.query;
        if (!id) {
            const tags = await tagService.findAll();
            ctx.body = {
                tags,
            };
        } else {
            const tags = await tagService.findById(id);
            ctx.body = {
                tags,
            };
        }
    },
};