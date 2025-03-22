import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { RequestWithUser } from '../api/types/auth.types';

export const Executor = createParamDecorator((_: never, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest<RequestWithUser>();
  return request.user;
});
