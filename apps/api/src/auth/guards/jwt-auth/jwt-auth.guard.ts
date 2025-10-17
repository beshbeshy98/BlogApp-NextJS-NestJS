import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){
  getRequest(contxt: ExecutionContext) {
    const ctx = GqlExecutionContext.create(contxt);
    return ctx.getContext().req;
  }
}