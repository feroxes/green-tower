"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlantModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_strategy_1 = require("../../strategies/jwt.strategy");
const farm_entity_1 = require("../../entities/farm.entity");
const plant_entity_1 = require("../../entities/plant.entity");
const user_entity_1 = require("../../entities/user.entity");
const plant_controller_1 = require("../controllers/plant.controller");
const plant_service_1 = require("../../services/plant/plant.service");
const plant_create_service_1 = require("../../services/plant/plant-create.service");
const plant_delete_service_1 = require("../../services/plant/plant-delete.service");
const plant_get_service_1 = require("../../services/plant/plant-get.service");
const plant_list_service_1 = require("../../services/plant/plant-list.service");
const plant_update_service_1 = require("../../services/plant/plant-update.service");
const token_service_1 = require("../../services/token/token.service");
const farm_component_1 = require("../../components/farm.component");
const plant_component_1 = require("../../components/plant.component");
const user_component_1 = require("../../components/user.component");
let PlantModule = class PlantModule {
};
exports.PlantModule = PlantModule;
exports.PlantModule = PlantModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, plant_entity_1.Plant, farm_entity_1.Farm])],
        controllers: [plant_controller_1.PlantController],
        providers: [
            plant_service_1.PlantService,
            plant_create_service_1.PlantCreateService,
            plant_update_service_1.PlantUpdateService,
            jwt_strategy_1.JwtStrategy,
            farm_component_1.FarmComponent,
            user_component_1.UserComponent,
            plant_get_service_1.PlantGetService,
            plant_delete_service_1.PlantDeleteService,
            plant_list_service_1.PlantListService,
            plant_component_1.PlantComponent,
            token_service_1.TokenService,
        ],
        exports: [plant_service_1.PlantService],
    })
], PlantModule);
//# sourceMappingURL=plant.module.js.map