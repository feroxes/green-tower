import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorCodes } from '@utils/constants';
import { Repository } from 'typeorm';

import { Plant } from '@entities/plant.entity';

import { FarmComponent } from '@components/farm.component';
import { PlantComponent } from '@components/plant.component';
import { UserComponent } from '@components/user.component';

import { PlantDeleteDto } from '@dtos/plant.dto';

import { plantDeleteError } from '@errors/plant.errors';

import { ExecutorType } from '@app-types/auth.types';

@Injectable()
export class PlantDeleteService {
  constructor(
    @InjectRepository(Plant)
    private plantRepository: Repository<Plant>,
    private userComponent: UserComponent,
    private farmComponent: FarmComponent,
    private plantComponent: PlantComponent,
  ) {}

  async delete(plantDeleteDto: PlantDeleteDto, executor: ExecutorType): Promise<object> {
    const useCase = 'plant/delete/';
    await this.userComponent.checkUserExistence(executor.id, executor.farmId, useCase);

    await this.farmComponent.checkFarmExistence(executor.farmId, useCase);

    const plant = await this.plantComponent.checkPlantExistence(
      { id: plantDeleteDto.id, farm: { id: executor.farmId } },
      useCase,
    );

    try {
      await this.plantRepository.remove(plant);
    } catch (e: unknown) {
      if (e instanceof Error && 'code' in e) {
        const error = e as { code: string; message: string };
        if (error.code === ErrorCodes.DB.foreignKeyViolation) {
          await this.plantRepository.save({ ...plant, isDeleted: true });
        }
      } else throw plantDeleteError.FailedToDeletePlant({ e });
    }

    return {};
  }
}
