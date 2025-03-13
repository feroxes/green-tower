import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '../../entities/user.entity';
import { RegisterDto, AuthResponseDto } from '../../dtos/auth.dto';
import { FarmCreateService } from '../farm/farm-create.service';

@Injectable()
export class AuthSignupService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private farmCreateService: FarmCreateService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const existingUser = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const farm = await this.farmCreateService.create({
      name: registerDto.farmName,
    });

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = this.userRepository.create({
      ...registerDto,
      password: hashedPassword,
      role: UserRole.ADMIN,
      farmId: farm.id,
    });

    await this.userRepository.save(user);

    const token = this.generateToken(user);

    return { accessToken: token };
  }

  private generateToken(user: User): string {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      farmId: user.farmId,
    };

    return this.jwtService.sign(payload);
  }
}
