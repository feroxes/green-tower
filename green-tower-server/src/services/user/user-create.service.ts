import { Injectable } from '@nestjs/common';

import { User } from '@entities/user.entity';

import { EmailService } from '@services/email/email.service';

import { FarmComponent } from '@components/farm.component';
import { UserComponent } from '@components/user.component';

import { UserCreateCmdDto } from '@dtos/user.dto';

import { userCreateError } from '@errors/user.errors';

import { ExecutorType } from '@app-types/auth.types';

@Injectable()
export class UserCreateService {
  constructor(
    private userComponent: UserComponent,
    private farmComponent: FarmComponent,
    private emailService: EmailService,
  ) {}

  async create(userCreateDto: UserCreateCmdDto, executor: ExecutorType): Promise<User> {
    const useCase = 'user/create/';
    await this.userComponent.checkUserExistence(executor.id, executor.farmId, useCase);

    const farm = await this.farmComponent.checkFarmExistence(executor.farmId, useCase);

    const { user } = await this.userComponent.create(userCreateDto, farm, useCase);

    try {
      await this.emailService.sendEmailConfirmation(user.email, userCreateDto.language, user.emailConfirmationToken!);
    } catch (e: unknown) {
      throw userCreateError.FailedToSendConfirmationEmail({ e });
    }

    return user;
  }
}
