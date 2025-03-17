import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '../../entities/user.entity';
import { Farm } from '../../entities/farm.entity';
import { RegisterDto, AuthResponseDto } from '../../dtos/auth.dto';

@Injectable()
export class AuthSignupService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Farm)
    private farmRepository: Repository<Farm>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const existingUser = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    let farm = this.farmRepository.create({
      name: registerDto.farmName,
    });

    farm = await this.farmRepository.save(farm);

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = this.userRepository.create({
      ...registerDto,
      password: hashedPassword,
      role: UserRole.ADMIN,
      farm: farm,
    });

    await this.userRepository.save(user);

    farm.owner = user;

    await this.farmRepository.save(farm);

    const token = this.generateToken(user);

    return { accessToken: token };
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
