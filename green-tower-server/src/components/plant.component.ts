import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { List } from '@decorators/list.decorator';

import { Plant } from '@entities/plant.entity';

import { PlantListFiltersDto, PlantListSortersDto } from '@dtos/plant.dto';

import { PlantComponentError } from '@errors/plant-component.errors';

import { ExecutorType } from '@app-types/auth.types';
import { SortDirectionType } from '@app-types/common.types';
import { ListMetaDto, ListResponseType } from '@app-types/dto.types';

@Injectable()
export class PlantComponent {
  constructor(
    @InjectRepository(Plant)
    private plantRepository: Repository<Plant>,
  ) {}

  async checkPlantExistence(
    filter: { id: string; farm: { id: string } },
    errorCode: string,
    params?: object,
  ): Promise<Plant> {
    const Errors = new PlantComponentError(errorCode);
    const plant = await this.plantRepository.findOne({
      where: { ...filter, isDeleted: false },
      relations: ['farm', 'createdBy'],
      ...(params && { ...params }),
    });

    if (!plant) {
      throw Errors.PlantNotFound();
    }
    return plant;
  }

  @List({
    entity: Plant,
    relations: ['farm', 'createdBy'],
    defaultSort: { field: 'createdAt', order: SortDirectionType.DESC },
  })
  async list(
    executor: ExecutorType,
    meta: ListMetaDto,
    filters?: PlantListFiltersDto,
    sorters?: PlantListSortersDto,
  ): Promise<ListResponseType<Plant>> {
    return Promise.resolve({ itemList: [], meta: { page: 0, size: 0, total: 0 } });
  }
}
