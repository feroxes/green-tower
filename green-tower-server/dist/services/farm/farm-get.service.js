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
exports.FarmGetService = void 0;
const common_1 = require("@nestjs/common");
const farm_component_1 = require("../../components/farm.component");
const user_component_1 = require("../../components/user.component");
const farm_errors_1 = require("../../api/errors/farm.errors");
let FarmGetService = class FarmGetService {
    constructor(userComponent, farmComponent) {
        this.userComponent = userComponent;
        this.farmComponent = farmComponent;
    }
    async get(farmGetDto, executor) {
        const useCase = 'farm/get/';
        await this.userComponent.checkUserExistence(executor.id, executor.farmId, useCase);
        const farm = await this.farmComponent.checkFarmExistence(farmGetDto.id, useCase, {
            relations: ['owner', 'users', 'plants'],
        });
        if (executor.id !== farm.owner.id) {
            throw farm_errors_1.getError.Forbidden();
        }
        return farm;
    }
};
exports.FarmGetService = FarmGetService;
exports.FarmGetService = FarmGetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_component_1.UserComponent,
        farm_component_1.FarmComponent])
], FarmGetService);
//# sourceMappingURL=farm-get.service.js.map