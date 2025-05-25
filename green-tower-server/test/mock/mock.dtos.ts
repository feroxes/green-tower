import { PlantType } from '../../src/entities/plant.entity';
import { PlantingType } from '../../src/entities/planting.entity';
import { UserRole } from '../../src/entities/user.entity';

import { LoginDto, RegisterDto } from '../../src/api/dtos/auth.dto';
import { UserCreateCmdDto } from '../../src/api/dtos/user.dto';

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
      language: 'uk',
      role,
    } as UserCreateCmdDto;
  },
  userUpdateDto: {
    firstName: 'Elizabeth',
    lastName: 'Huanita Cortes',
  },
  plantCreateDto: {
    name: 'Microgreen plant',
    description: 'Microgreen plant description',
    notes: 'Microgreen plant note',
    imageUrl: 'https://moya-dacha.com.ua/wp-content/uploads/2021/07/mikrogrin-Rediska.jpg',
    type: PlantType.MICROGREEN,
    expectedHoursToHarvest: 144,
    hoursToSoak: 0,
    hoursToMoveToLight: 72,
    shouldBePressed: false,
    seedsGramPerPlate: 7,
    expectedHarvestGramsPerPlate: 24,
    sellPricePerPlate: 200,
  },
  plantUpdateDto: {
    name: 'Updated Microgreen plant',
    description: 'Updated Microgreen plant description',
    notes: 'Updated Microgreen plant note',
    imageUrl: 'https://moya-dacha.com.ua/wp-content/uploads/2021/07/mikrogrin-Rediska.jpg',
    type: PlantType.MICROGREEN,
    expectedHoursToHarvest: 244,
    hoursToSoak: 2,
    hoursToMoveToLight: 32,
    shouldBePressed: true,
    seedsGramPerPlate: 2,
    expectedHarvestGramsPerPlate: 14,
    sellPricePerPlate: 100,
  },
  plantingCreateDto: {
    plantId: '',
    notes: 'Some notes',
    amountOfPlates: 10,
    amountOfGramsOfSeeds: 200,
    type: PlantingType.PLATE,
  },
  plantingUpdateDto: {
    notes: null,
    amountOfPlates: 12,
    amountOfGramsOfSeeds: 300,
  },
};
