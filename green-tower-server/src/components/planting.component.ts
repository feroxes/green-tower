import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Plant } from '../entities/plant.entity';
import { Planting, PlantingState } from '../entities/planting.entity';

import { PlantingListFiltersDto, PlantingListSortersDto } from '../api/dtos/planting.dto';

import { PlantingComponentError } from '../api/errors/planting-component.errors';

import { ExecutorType } from '../api/types/auth.types';

import { ListMetaDto, ListResponseType } from '../api/types/dto-types';
import { createListMetaDto } from '../decorators/list.decorator';

@Injectable()
export class PlantingComponent {
  constructor(
    @InjectRepository(Planting)
    private plantingRepository: Repository<Planting>,
  ) {}

  getExpectedHarvestTs(plant: Plant): Date {
    const expectedHarvestTs = new Date();
    expectedHarvestTs.setHours(expectedHarvestTs.getHours() + plant.expectedHoursToHarvest);
    return expectedHarvestTs;
  }

  async checkPlantingExistence(
    filter: { id: string; farm: { id: string } },
    errorCode: string,
    params?: object,
  ): Promise<Planting> {
    const Errors = new PlantingComponentError(errorCode);
    const planting = await this.plantingRepository.findOne({
      where: filter,
      relations: ['farm', 'createdBy', 'plant'],
      ...(params && { ...params }),
    });

    if (!planting) {
      throw Errors.PlantingNotFound();
    }
    return planting;
  }

  async list(
    executor: ExecutorType,
    meta?: ListMetaDto,
    filters?: PlantingListFiltersDto,
    sorters?: PlantingListSortersDto,
  ): Promise<ListResponseType<Planting>> {
    const _meta = createListMetaDto(meta);
    const queryBuilder = this.plantingRepository
      .createQueryBuilder('planting')
      .leftJoinAndSelect('planting.plant', 'plant')
      .leftJoinAndSelect('planting.createdBy', 'createdBy')
      .leftJoinAndSelect('planting.farm', 'farm')
      .where('planting.farm.id = :farmId', { farmId: executor.farmId });

    if (filters?.state) {
      queryBuilder.andWhere('planting.state = :state', { state: filters.state });
    }

    queryBuilder.addSelect(
      `
      CASE planting.state
        WHEN '${PlantingState.READY}' THEN 1
        WHEN '${PlantingState.GROWING}' THEN 2
        WHEN '${PlantingState.HARVESTED}' THEN 3
        WHEN '${PlantingState.DEAD}' THEN 4
        ELSE 5
      END`,
      'state_priority',
    );

    queryBuilder.addSelect(
      `
      CASE 
        WHEN planting.state = '${PlantingState.GROWING}' THEN 
          planting.created_at + (plant.expectedHoursToHarvest * interval '1 hour')
        ELSE NULL
      END`,
      'expected_harvest_time',
    );

    queryBuilder.orderBy('state_priority', 'ASC');

    queryBuilder.addOrderBy('expected_harvest_time', 'ASC');

    queryBuilder.addOrderBy('planting.expectedHarvestTs', 'ASC');

    queryBuilder.addOrderBy('planting.createdAt', 'DESC');

    const skip = _meta.page * _meta.size;
    queryBuilder.skip(skip).take(_meta.size);

    const [itemList, total] = await queryBuilder.getManyAndCount();

    return {
      itemList,
      meta: {
        page: _meta.page,
        size: _meta.size,
        total,
      },
    };
  }
}
