import { Type } from '@nestjs/common';
import { ObjectLiteral, Repository } from 'typeorm';

import { ExecutorType } from '../api/types/auth.types';
import { SortDirectionType, SortOptions } from '../api/types/common.types';

import { ListMetaDto, ListResponseType } from '../api/types/dto-types';

export interface ListOptions<T extends ObjectLiteral> {
  entity: Type<T>;
  relations?: string[];
  defaultSort?: SortOptions;
}

function createListMetaDto(partial: Partial<ListMetaDto> = {}): ListMetaDto {
  const dto = new ListMetaDto();
  dto.page = partial.page ?? 0;
  dto.size = partial.size ?? 20;
  return dto;
}

export function List<T extends ObjectLiteral>(options: ListOptions<T>) {
  return function (_: any, __: string, descriptor: PropertyDescriptor) {
    descriptor.value = async function (
      this: { repository: Repository<T> },
      executor: ExecutorType,
      meta: ListMetaDto,
      filters: Record<string, unknown>,
      sorters?: Record<string, SortDirectionType>,
    ): Promise<ListResponseType<T>> {
      let repository: Repository<T> | undefined = this.repository;

      if (!repository) {
        const repoKey = options.entity.name.charAt(0).toLowerCase() + options.entity.name.slice(1) + 'Repository';
        repository = this[repoKey] as Repository<T>;
      }

      const entityName = options.entity.name.toLowerCase();
      const queryBuilder = repository.createQueryBuilder(entityName);

      queryBuilder.andWhere(`${entityName}.farmId = :farmId`, { farmId: executor.farmId });

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined) {
            queryBuilder.andWhere(`${entityName}.${key} = :${key}`, { [key]: value });
          }
        });
      }

      if (sorters) {
        Object.entries(sorters).forEach(([key, value]) => {
          if (value) {
            queryBuilder.orderBy(`${entityName}.${key}`, value);
          }
        });
      } else if (options.defaultSort) {
        queryBuilder.orderBy(`${entityName}.${options.defaultSort.field}`, options.defaultSort.order);
      }

      const _meta = createListMetaDto(meta);

      const skip = _meta.page * _meta.size;
      queryBuilder.skip(skip).take(_meta.size);

      if (options.relations) {
        options.relations.forEach((relation) => {
          queryBuilder.leftJoinAndSelect(`${entityName}.${relation}`, relation);
        });
      }

      const [itemList, total] = await queryBuilder.getManyAndCount();

      return {
        itemList,
        meta: {
          page: _meta.page,
          size: _meta.size,
          total,
        },
      };
    };
    return descriptor;
  };
}
