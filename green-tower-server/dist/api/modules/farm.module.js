"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_strategy_1 = require("../../strategies/jwt.strategy");
const farm_entity_1 = require("../../entities/farm.entity");
const plant_entity_1 = require("../../entities/plant.entity");
const user_entity_1 = require("../../entities/user.entity");
const farm_controller_1 = require("../controllers/farm.controller");
const farm_service_1 = require("../../services/farm/farm.service");
const farm_get_service_1 = require("../../services/farm/farm-get.service");
const token_service_1 = require("../../services/token/token.service");
const farm_component_1 = require("../../components/farm.component");
const user_component_1 = require("../../components/user.component");
let FarmModule = class FarmModule {
};
exports.FarmModule = FarmModule;
exports.FarmModule = FarmModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([farm_entity_1.Farm, user_entity_1.User, plant_entity_1.Plant])],
        controllers: [farm_controller_1.FarmController],
        providers: [farm_service_1.FarmService, farm_get_service_1.FarmGetService, jwt_strategy_1.JwtStrategy, farm_component_1.FarmComponent, token_service_1.TokenService, user_component_1.UserComponent],
        exports: [farm_service_1.FarmService],
    })
], FarmModule);
//# sourceMappingURL=farm.module.js.map