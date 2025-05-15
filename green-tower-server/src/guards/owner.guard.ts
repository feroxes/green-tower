import { CanActivate, ExecutionContext } from '@nestjs/common';

import { UserRole } from '../entities/user.entity';

import { RequestWithUser } from '../api/types/auth.types';

export class OwnerGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<RequestWithUser>();

    if (!request.user) {
      return false;
    }
    return request.user.role === UserRole.OWNER;
  }
}
