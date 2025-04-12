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
exports.PlantService = void 0;
const common_1 = require("@nestjs/common");
const plant_create_service_1 = require("./plant-create.service");
const plant_delete_service_1 = require("./plant-delete.service");
const plant_get_service_1 = require("./plant-get.service");
const plant_list_service_1 = require("./plant-list.service");
const plant_update_service_1 = require("./plant-update.service");
let PlantService = class PlantService {
    constructor(plantCreateService, plantUpdateService, plantGetService, plantDeleteService, plantListService) {
        this.plantCreateService = plantCreateService;
        this.plantUpdateService = plantUpdateService;
        this.plantGetService = plantGetService;
        this.plantDeleteService = plantDeleteService;
        this.plantListService = plantListService;
    }
    async create(plantCreateDto, executor) {
        return this.plantCreateService.create(plantCreateDto, executor);
    }
    async update(plantUpdateDto, executor) {
        return this.plantUpdateService.update(plantUpdateDto, executor);
    }
    async get(plantGetDto, executor) {
        return this.plantGetService.get(plantGetDto, executor);
    }
    async delete(plantDeleteDto, executor) {
        return this.plantDeleteService.delete(plantDeleteDto, executor);
    }
    async list(plantListDto, executor) {
        return this.plantListService.list(plantListDto, executor);
    }
};
exports.PlantService = PlantService;
exports.PlantService = PlantService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [plant_create_service_1.PlantCreateService,
        plant_update_service_1.PlantUpdateService,
        plant_get_service_1.PlantGetService,
        plant_delete_service_1.PlantDeleteService,
        plant_list_service_1.PlantListService])
], PlantService);
//# sourceMappingURL=plant.service.js.map