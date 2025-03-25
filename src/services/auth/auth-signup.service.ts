import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Farm } from '../../entities/farm.entity';
import { User, UserRole } from '../../entities/user.entity';

import { EmailService } from '../email/email.service';

import { UserComponent } from '../../components/user.component';

import { AuthResponseDto, RegisterDto } from '../../api/dtos/auth.dto';

import { registerError } from '../../api/errors/auth.errors';

@Injectable()
export class AuthSignupService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Farm)
    private farmRepository: Repository<Farm>,
    private userComponent: UserComponent,
    private emailService: EmailService,
  ) {}

  async register(registerDto: RegisterDto): Promise<object> {
    let farm = this.farmRepository.create({
      name: registerDto.farmName,
    });
    const createUserDto = { ...registerDto, role: UserRole.OWNER };
    // @ts-ignore - no need here
    delete createUserDto.farmName;
    const { user } = await this.userComponent.create(createUserDto, farm, 'auth/register/');

    farm.owner = user;

    try {
      farm = await this.farmRepository.save(farm);
    } catch (e: unknown) {
      await this.userRepository.remove(user);
      throw registerError.FailedToCreateFarm({ e });
    }

    try {
      await this.userRepository.save({ ...user, farm });
    } catch (e: unknown) {
      await this.userRepository.remove(user);
      await this.farmRepository.remove(farm);
      throw registerError.FailedToUpdateUser({ e });
    }

    try {
      await this.emailService.sendEmailConfirmation(user.email, user.emailConfirmationToken!);
    } catch (e: unknown) {
      throw registerError.FailedToSendConfirmationEmail({ e });
    }

    return {};
  }
}
