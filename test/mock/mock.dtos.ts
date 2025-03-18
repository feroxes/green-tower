import { LoginDto, RegisterDto } from '../../src/api/dtos/auth.dto';
import { UserCreateCmdDto } from '../../src/api/dtos/user.dto';
import { UserRole } from '../../src/entities/user.entity';

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
};
