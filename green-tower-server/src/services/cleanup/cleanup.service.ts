import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LessThan } from 'typeorm';

import { Farm } from '../../entities/farm.entity';
import { User } from '../../entities/user.entity';

@Injectable()
export class CleanupService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Farm)
    private farmRepository: Repository<Farm>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async removeUnconfirmedUsers() {
    const unconfirmedUsers = await this.userRepository.find({
      where: {
        isEmailConfirmed: false,
        emailConfirmationExpires: LessThan(new Date()),
      },
      relations: ['farm'],
    });

    if (unconfirmedUsers.length > 0) {
      for (const user of unconfirmedUsers) {
        if (user.farm) {
          const farm = await this.farmRepository.findOne({
            where: { owner: { id: user.id } },
            relations: ['users', 'plants'],
          });
          if (farm) {
            farm.users = [];
            farm.plants = [];
            await this.farmRepository.save(farm);
            await this.farmRepository.remove(farm);
          }
        }
      }

      // Then remove the users
      await this.userRepository.remove(unconfirmedUsers);
    }
  }
}
