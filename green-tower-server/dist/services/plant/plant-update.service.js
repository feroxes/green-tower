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
exports.PlantUpdateService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const plant_entity_1 = require("../../entities/plant.entity");
const farm_component_1 = require("../../components/farm.component");
const plant_component_1 = require("../../components/plant.component");
const user_component_1 = require("../../components/user.component");
const plant_errors_1 = require("../../api/errors/plant.errors");
let PlantUpdateService = class PlantUpdateService {
    constructor(plantRepository, userComponent, farmComponent, plantComponent) {
        this.plantRepository = plantRepository;
        this.userComponent = userComponent;
        this.farmComponent = farmComponent;
        this.plantComponent = plantComponent;
    }
    async update(plantUpdateDto, executor) {
        const useCase = 'plant/update/';
        await this.userComponent.checkUserExistence(executor.id, executor.farmId, useCase);
        await this.farmComponent.checkFarmExistence(executor.farmId, useCase);
        let plant = await this.plantComponent.checkPlantExistence({ id: plantUpdateDto.id, farm: { id: executor.farmId } }, useCase);
        const _plantUpdateDto = {
            ...plant,
            ...plantUpdateDto,
        };
        try {
            plant = await this.plantRepository.save(_plantUpdateDto);
        }
        catch (e) {
            throw plant_errors_1.plantUpdateError.FailedToUpdatePlant({ e });
        }
        return plant;
    }
};
exports.PlantUpdateService = PlantUpdateService;
exports.PlantUpdateService = PlantUpdateService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(plant_entity_1.Plant)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_component_1.UserComponent,
        farm_component_1.FarmComponent,
        plant_component_1.PlantComponent])
], PlantUpdateService);
//# sourceMappingURL=plant-update.service.js.map