import { userService } from '../service';

export const userController = {
    async create(ctx) {
        const { email } = ctx.request.body;
        if (await userService.exists({ email })) {
            return ctx.body = {
                error: 'this email has been used, please use another one',
            };
        }
        try {
            await userService.createUser(ctx.request.body);
            return ctx.body = {
                message: 'create user success',
            };
        } catch (e) {
            ctx.body = {
                error: e,
            };
        }
    },
};