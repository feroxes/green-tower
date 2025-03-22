import { UserRole } from '../../src/entities/user.entity';

import { LoginDto, RegisterDto } from '../../src/api/dtos/auth.dto';
import { UserCreateCmdDto, UserUpdateDto } from '../../src/api/dtos/user.dto';

const commonValues = {
  email: 'john@example.com',
  password: 'password123',
} as const;

export const mockDto = {
  authRegisterDto: {
    firstName: 'John',
    lastName: 'Doe',
    email: commonValues.email,
    password: commonValues.password,
    farmName: 'Test Farm',
  } as RegisterDto,
  authLoginDto: {
    email: commonValues.email,
    password: commonValues.password,
  } as LoginDto,
  getUserCreateDto(role = UserRole.ADMIN) {
    return {
      firstName: 'Karmen',
      lastName: 'Cortes',
      email: 'karmen@example.com',
      password: 'karmen123',
      role,
    } as UserCreateCmdDto;
  },
  userUpdateDto: {
    firstName: 'Elizabeth',
    lastName: 'Huanita Cortes',
  } as Omit<UserUpdateDto, 'id'>,
  plantCreateDto: {
    name: 'Microgreen plant',
    description: 'Microgreen plant description',
    notes: 'Microgreen plant note',
    imageUrl: 'https://moya-dacha.com.ua/wp-content/uploads/2021/07/mikrogrin-Rediska.jpg',
    type: 'microgreen',
    expectedHoursToHarvest: 144,
    hoursToSoak: 0,
    hoursToMoveToLight: 72,
    shouldBePressed: false,
    seedsGramPerPlate: 7,
    expectedHarvestGramsPerPlate: 24,
  },
};
