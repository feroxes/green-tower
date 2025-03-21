import { UserRole } from '../../entities/user.entity';

export type OwnerTokenType = { id: string; role: UserRole.OWNER; farmId: string };
export type OwnerOrAdminTokenType = { id: string; role: UserRole.OWNER | UserRole.ADMIN; farmId: string };

export interface RequestWithUser extends Request {
  user?: {
    id: string;
    role: UserRole;
  };
}
