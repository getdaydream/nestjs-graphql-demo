import { Controller } from 'egg';

export default class UserController extends Controller {
  public async create() {
    const { ctx } = this;
    const { email, password } = ctx.request.body;
    ctx.body = await ctx.service.user.create(email, password);
  }

  public async find() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.find();
  }
}
