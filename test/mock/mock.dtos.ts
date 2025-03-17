import { RegisterDto } from '../../src/api/dtos/auth.dto';

export const mockDto = {
  authRegisterDto: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'password123',
    farmName: 'Test Farm',
  } as RegisterDto,
};
