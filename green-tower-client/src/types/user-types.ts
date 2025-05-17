import { UserRoles } from './types';

export type UpdateUserDtoType = {
  id: string;
  firstName: string;
  lastName: string;
};

export type UserDto = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: UserRoles;
};
