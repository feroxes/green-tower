import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Planting } from '../../entities/planting.entity';

import { FarmComponent } from '../../components/farm.component';
import { PlantingComponent } from '../../components/planting.component';
import { UserComponent } from '../../components/user.component';

import { PlantingDeleteDto } from '../../api/dtos/planting.dto';

import { plantingDeleteError } from '../../api/errors/planting.errors';

import { ExecutorType } from '../../api/types/auth.types';

import { ErrorCodes } from '../../utils/constants';

@Injectable()
export class PlantingDeleteService {
  constructor(
    @InjectRepository(Planting)
    private plantingRepository: Repository<Planting>,
    private userComponent: UserComponent,
    private farmComponent: FarmComponent,
    private plantingComponent: PlantingComponent,
  ) {}

  async delete(plantingDeleteDto: PlantingDeleteDto, executor: ExecutorType): Promise<void> {
    const useCase = 'planting/delete/';

    await this.userComponent.checkUserExistence(executor.id, executor.farmId, useCase);
    await this.farmComponent.checkFarmExistence(executor.farmId, useCase);
    const planting = await this.plantingComponent.checkPlantingExistence(
      { id: plantingDeleteDto.id, farm: { id: executor.farmId } },
      useCase,
    );

    try {
      await this.plantingRepository.delete(plantingDeleteDto.id);
    } catch (e: unknown) {
      if (e instanceof Error && 'code' in e) {
        const error = e as { code: string; message: string };
        if (error.code === ErrorCodes.DB.foreignKeyViolation) {
          await this.plantingRepository.save({ ...planting, isDeleted: true });
        }
      } else throw plantingDeleteError.FailedToDeletePlanting({ e });
    }
  }
}
