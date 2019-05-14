import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticationError } from 'apollo-server-core';

@Injectable()
// In order to use AuthGuard together with GraphQL, you have to extend
// the built-in AuthGuard class and override getRequest() method.
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    return request;
  }

  /**
   * @param _info error info
   */
  handleRequest(err: any, user: any, _info: any) {
    // TODO: hack 避免 apollo-client getDataFromTree 报错

    // if (err || !user) {
    //   throw err || new AuthenticationError('Could not authenticate with token');
    // }
    return user;
  }
}
