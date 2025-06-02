import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Planting, PlantingState } from '@entities/planting.entity';
import { User } from '@entities/user.entity';

@Injectable()
export class PlantingAutoSetStateService {
  constructor(
    @InjectRepository(Planting)
    private plantingRepository: Repository<User>,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async handlePlantingsReadyTransition() {
    await this.plantingRepository
      .createQueryBuilder()
      .update(Planting)
      .set({ state: PlantingState.READY })
      .where('state = :state', { state: PlantingState.GROWING })
      .andWhere('expectedHarvestTs >= NOW()')
      .execute();
  }
}
