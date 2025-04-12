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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlantListService = void 0;
const common_1 = require("@nestjs/common");
const farm_component_1 = require("../../components/farm.component");
const plant_component_1 = require("../../components/plant.component");
const user_component_1 = require("../../components/user.component");
let PlantListService = class PlantListService {
    constructor(userComponent, farmComponent, plantComponent) {
        this.userComponent = userComponent;
        this.farmComponent = farmComponent;
        this.plantComponent = plantComponent;
    }
    async list(plantListDto, executor) {
        const useCase = 'plant/list/';
        await this.userComponent.checkUserExistence(executor.id, executor.farmId, useCase);
        await this.farmComponent.checkFarmExistence(executor.farmId, useCase);
        return await this.plantComponent.list(executor, plantListDto.meta, plantListDto.filters, plantListDto.sorters);
    }
};
exports.PlantListService = PlantListService;
exports.PlantListService = PlantListService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_component_1.UserComponent,
        farm_component_1.FarmComponent,
        plant_component_1.PlantComponent])
], PlantListService);
//# sourceMappingURL=plant-list.service.js.map