import { UserRole } from '../../entities/user.entity';

export type ExecutorType = {
  id: string;
  role: UserRole.OWNER | UserRole.ADMIN | UserRole.USER;
  farmId: string;
  email: string;
};

export interface RequestWithUser extends Request {
  user?: ExecutorType;
}

export interface JwtPayloadType {
  sub: string;
  email: string;
  role: string;
  farmId: string;
  exp?: number;
  iat?: number;
}
