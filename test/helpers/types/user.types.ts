import { Plant } from '../../../src/entities/plant.entity';
import { User } from '../../../src/entities/user.entity';

export type UserCreateResponseType = {
  body: User;
};
export type PlantCreateResponseType = {
  body: Plant;
};
