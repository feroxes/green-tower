import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Farm } from '../../entities/farm.entity';
import { User, UserRole } from '../../entities/user.entity';

import { UserComponent } from '../../components/user.component';

import { AuthResponseDto, RegisterDto } from '../../api/dtos/auth.dto';

@Injectable()
export class AuthSignupService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Farm)
    private farmRepository: Repository<Farm>,
    private userComponent: UserComponent,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    let farm = this.farmRepository.create({
      name: registerDto.farmName,
    });
    const createUserDto = { ...registerDto, role: UserRole.OWNER };
    // @ts-ignore - no need here
    delete createUserDto.farmName;
    const { user, accessToken } = await this.userComponent.create(createUserDto, farm, 'auth/register/');

    farm.owner = user;
    farm = await this.farmRepository.save(farm);

    await this.userRepository.save({ ...user, farm });

    return { accessToken };
  }
}
