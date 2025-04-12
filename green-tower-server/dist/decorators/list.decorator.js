"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = List;
const dto_types_1 = require("../api/types/dto-types");
function createListMetaDto(partial = {}) {
    const dto = new dto_types_1.ListMetaDto();
    dto.page = partial.page ?? 0;
    dto.size = partial.size ?? 20;
    return dto;
}
function List(options) {
    return function (_, __, descriptor) {
        descriptor.value = async function (executor, meta, filters, sorters) {
            let repository = this.repository;
            if (!repository) {
                const repoKey = options.entity.name.charAt(0).toLowerCase() + options.entity.name.slice(1) + 'Repository';
                repository = this[repoKey];
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
            }
            else if (options.defaultSort) {
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
//# sourceMappingURL=list.decorator.js.map