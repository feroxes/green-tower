import { UserRole } from '../../entities/user.entity';

export type OwnerTokenType = { id: string; role: UserRole.OWNER; farmId: string };
