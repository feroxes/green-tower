import { PlantingType } from '@entities/enums/planting-type.enum';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Planting, PlantingState } from '@entities/planting.entity';

import { FarmComponent } from '@components/farm.component';
import { PlantComponent } from '@components/plant.component';
import { PlantingComponent } from '@components/planting.component';
import { UserComponent } from '@components/user.component';

import { PlantingCreateDto } from '@dtos/planting.dto';

import { plantingCreateError } from '@errors/planting.errors';

import { ExecutorType } from '@app-types/auth.types';

@Injectable()
export class PlantingCreateService {
  constructor(
    @InjectRepository(Planting)
    private plantingRepository: Repository<Planting>,
    private userComponent: UserComponent,
    private farmComponent: FarmComponent,
    private plantComponent: PlantComponent,
    private plantingComponent: PlantingComponent,
  ) {}

  async create(plantingCreateDto: PlantingCreateDto, executor: ExecutorType): Promise<Planting> {
    const useCase = 'planting/create/';
    const user = await this.userComponent.checkUserExistence(executor.id, executor.farmId, useCase);
    const farm = await this.farmComponent.checkFarmExistence(executor.farmId, useCase);
    const plant = await this.plantComponent.checkPlantExistence(
      { id: plantingCreateDto.plantId, farm: { id: executor.farmId } },
      useCase,
    );

    const expectedHarvestGrams = plantingCreateDto.amountOfGramsOfSeeds * plant.expectedHarvestGramsPerGramOfSeeds;

    const _plantingCreateDto = {
      ...plantingCreateDto,
      state: PlantingState.GROWING,
      createdBy: user,
      farm,
      plant,
      expectedHarvestTs: this.plantingComponent.getExpectedHarvestTs(plant),
      expectedHarvestGrams: parseFloat(expectedHarvestGrams.toFixed(6)),
    };

    if (_plantingCreateDto.type === PlantingType.CUT) {
      // @ts-ignore not needed here
      delete _plantingCreateDto.amountOfPlates;
    }

    let planting = this.plantingRepository.create(_plantingCreateDto);
    try {
      planting = await this.plantingRepository.save(planting);
    } catch (e: unknown) {
      throw plantingCreateError.FailedToCreatePlanting({ e });
    }

    return planting;
  }
}
