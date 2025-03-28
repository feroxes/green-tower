import { Farm } from '../../../src/entities/farm.entity';
import { Plant } from '../../../src/entities/plant.entity';
import { User } from '../../../src/entities/user.entity';

import { ErrorResponse, GuardError } from '../validation-helper';

export type EmptyResponseType = {
  body: object;
};

export type LoginResponseType = {
  body: {
    accessToken: string;
  };
  headers: object;
};

export type UserResponseType = {
  body: User;
};

export type UserListResponseType = {
  body: User[];
};

export type FarmResponseType = {
  body: Farm;
};

export type PlantResponseType = {
  body: Plant;
};

export type ErrorResponseType = {
  body: ErrorResponse;
};

export type GuardErrorResponseType = {
  body: GuardError;
};
