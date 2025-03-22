import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { Farm } from '../entities/farm.entity';
import { User } from '../entities/user.entity';

import { UserCreateDto } from '../api/dtos/user.dto';

import { UserCheckExistenceComponentError, UserCreateComponentError } from '../api/errors/user-component.errors';

@Injectable()
export class UserComponent {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(createDto: UserCreateDto, farm: Farm, errorCode: string): Promise<{ user: User; accessToken: string }> {
    const Errors = new UserCreateComponentError(errorCode);
    const existingUser = await this.userRepository.findOne({
      where: { email: createDto.email },
    });

    if (existingUser) {
      throw Errors.UserAlreadyExists();
    }

    const hashedPassword = await bcrypt.hash(createDto.password, 10);

    let user = this.userRepository.create({
      ...createDto,
      password: hashedPassword,
    });

    user.farm = farm;

    user = await this.userRepository.save(user);

    const token = this.generateToken(user);

    return { accessToken: token, user };
  }

  async checkUserExistence(id: string, farmId: string, errorCode: string): Promise<User> {
    const Errors = new UserCheckExistenceComponentError(errorCode);
    const user = await this.userRepository.findOne({ where: { id, farm: { id: farmId } } });

    if (!user) {
      throw Errors.UserNotFound({ id });
    }
    return user;
  }

  private generateToken(user: User): string {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      farmId: user.farm.id,
    };

    return this.jwtService.sign(payload);
  }
}
