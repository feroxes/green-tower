import { LoginDto, RegisterDto } from '../../src/api/dtos/auth.dto';

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
};
