import { TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthController } from '../../src/api/controllers/auth.controller';
import { User } from '../../src/entities/user.entity';
import { mockDto } from '../mock/mock.dtos';

export async function registerAndFetchUser(module: TestingModule): Promise<User> {
  const authController = module.get<AuthController>(AuthController);
  const userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  await authController.register(mockDto.authRegisterDto);
  const user = await userRepository.findOne({
    where: { email: mockDto.authRegisterDto.email },
    relations: ['farm'],
  });
  return user!;
}
