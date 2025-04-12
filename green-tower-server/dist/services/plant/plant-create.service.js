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
exports.PlantCreateService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const plant_entity_1 = require("../../entities/plant.entity");
const farm_component_1 = require("../../components/farm.component");
const user_component_1 = require("../../components/user.component");
const plant_errors_1 = require("../../api/errors/plant.errors");
let PlantCreateService = class PlantCreateService {
    constructor(plantRepository, userComponent, farmComponent) {
        this.plantRepository = plantRepository;
        this.userComponent = userComponent;
        this.farmComponent = farmComponent;
    }
    async create(plantCreateDto, executor) {
        const useCase = 'plant/create/';
        const user = await this.userComponent.checkUserExistence(executor.id, executor.farmId, useCase);
        const farm = await this.farmComponent.checkFarmExistence(executor.farmId, useCase);
        const _plantCreateDto = {
            ...plantCreateDto,
            createdBy: user,
            farm,
        };
        let plant = this.plantRepository.create(_plantCreateDto);
        try {
            plant = await this.plantRepository.save(plant);
        }
        catch (e) {
            throw plant_errors_1.plantCreateError.FailedToCreatePlant({ e });
        }
        return plant;
    }
};
exports.PlantCreateService = PlantCreateService;
exports.PlantCreateService = PlantCreateService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(plant_entity_1.Plant)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_component_1.UserComponent,
        farm_component_1.FarmComponent])
], PlantCreateService);
//# sourceMappingURL=plant-create.service.js.map