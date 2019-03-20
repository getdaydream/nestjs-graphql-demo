/**
 * custom-decorators
 * create a @User() decorator and reuse it across all existing controllers
 * https://docs.nestjs.com/graphql/tooling
 */
import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator(
  (_data, [_root, _args, ctx, _info]) => ctx.user,
);
