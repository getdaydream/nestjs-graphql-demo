import { userService, authService } from '../service';

export const userController = {
  async create(ctx) {
    const { email } = ctx.request.body;
    if (await userService.find({ email })) {
      return (ctx.body = {
        error: 'this email has been used, please use another one',
      });
    }
    try {
      await userService.createUser(ctx.request.body);
      return (ctx.body = {
        message: 'create user success',
      });
    } catch (e) {
      ctx.body = {
        error: e,
      };
    }
  },
  async login(ctx) {
    const { email, password } = ctx.request.body;
    const user = await userService.find({ email, password });
    if (user) {
      const token = authService.createToken(user.id);
      ctx.cookies.set('token', token);
      ctx.body = {
        message: 'success',
      };
    } else {
        ctx.body = {
            error: 'wrong email or password',
        };
    }
  },
};
