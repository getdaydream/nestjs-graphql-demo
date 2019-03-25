/**
 * custom-decorators
 * create a @User() decorator and reuse it across all existing controllers
 * https://docs.nestjs.com/graphql/tooling
 */
import { createParamDecorator } from '@nestjs/common';

export const UserDecorator = createParamDecorator(
  (_data, [_root, _args, ctx, _info]) => {
    // inject to ctx.req by jwt.strategy.ts ?
    return ctx.req.user;
  },
);
