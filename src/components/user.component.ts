import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateError } from '../api/errors/user-component.errors';
import { User } from '../entities/user.entity';
import { UserCreateDto } from '../api/dtos/user.dto';

@Injectable()
export class UserComponent {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(createDto: UserCreateDto, errorCode: string): Promise<{ user: User; accessToken: string }> {
    const Errors = new CreateError(errorCode);
    const existingUser = await this.userRepository.findOne({
      where: { email: createDto.email },
    });

    if (existingUser) {
      throw Errors.UserAlreadyExists();
    }

    const hashedPassword = await bcrypt.hash(createDto.password, 10);

    const user = this.userRepository.create({
      ...createDto,
      password: hashedPassword,
    });

    await this.userRepository.save(user);

    const token = this.generateToken(user);

    return { accessToken: token, user };
  }

  private generateToken(user: User): string {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      farmId: user.farm,
    };

    return this.jwtService.sign(payload);
  }
}
