import { User } from '../../../src/entities/user.entity';
import { Plant } from '../../../src/entities/plant.entity';

export type UserCreateResponseType = {
  body: User;
};
export type PlantCreateResponseType = {
  body: Plant;
};
