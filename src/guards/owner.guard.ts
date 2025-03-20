import { CanActivate, ExecutionContext } from '@nestjs/common';
import { UserRole } from '../entities/user.entity';

interface RequestWithUser extends Request {
  user?: {
    id: string;
    role: UserRole;
  };
}

export class OwnerGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    if (!request.user) {
      return false;
    }
    return request.user.role === UserRole.OWNER;
  }
}
