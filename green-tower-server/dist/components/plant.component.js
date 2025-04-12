"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlantComponent = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const plant_entity_1 = require("../entities/plant.entity");
const plant_dto_1 = require("../api/dtos/plant.dto");
const plant_component_errors_1 = require("../api/errors/plant-component.errors");
const common_types_1 = require("../api/types/common.types");
const dto_types_1 = require("../api/types/dto-types");
const list_decorator_1 = require("../decorators/list.decorator");
let PlantComponent = class PlantComponent {
    constructor(plantRepository) {
        this.plantRepository = plantRepository;
    }
    async checkPlantExistence(filter, errorCode, params) {
        const Errors = new plant_component_errors_1.PlantComponentError(errorCode);
        const plant = await this.plantRepository.findOne({
            where: filter,
            relations: ['farm', 'createdBy'],
            ...(params && { ...params }),
        });
        if (!plant) {
            throw Errors.PlantNotFound();
        }
        return plant;
    }
    async list(executor, meta, filters, sorters) {
        return Promise.resolve({ itemList: [], meta: { page: 0, size: 0, total: 0 } });
    }
};
exports.PlantComponent = PlantComponent;
__decorate([
    (0, list_decorator_1.List)({
        entity: plant_entity_1.Plant,
        relations: ['farm', 'createdBy'],
        defaultSort: { field: 'createdAt', order: common_types_1.SortDirectionType.DESC },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_types_1.ListMetaDto,
        plant_dto_1.PlantListFiltersDto,
        plant_dto_1.PlantListSortersDto]),
    __metadata("design:returntype", Promise)
], PlantComponent.prototype, "list", null);
exports.PlantComponent = PlantComponent = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(plant_entity_1.Plant)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PlantComponent);
//# sourceMappingURL=plant.component.js.map