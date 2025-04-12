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
exports.UserSetRoleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../entities/user.entity");
const farm_component_1 = require("../../components/farm.component");
const user_component_1 = require("../../components/user.component");
const user_errors_1 = require("../../api/errors/user.errors");
let UserSetRoleService = class UserSetRoleService {
    constructor(userRepository, userComponent, farmComponent) {
        this.userRepository = userRepository;
        this.userComponent = userComponent;
        this.farmComponent = farmComponent;
    }
    async setRole(userSetRoleDto, executor) {
        const useCase = 'user/setRole/';
        await this.userComponent.checkUserExistence(executor.id, executor.farmId, useCase);
        if (userSetRoleDto.id === executor.id) {
            throw user_errors_1.userSetRoleError.OwnerCouldNotBeUpdated();
        }
        await this.farmComponent.checkFarmExistence(executor.farmId, useCase);
        let user = await this.userComponent.checkUserExistence(userSetRoleDto.id, executor.farmId, useCase);
        user.role = userSetRoleDto.role;
        try {
            user = await this.userRepository.save(user);
        }
        catch (e) {
            throw user_errors_1.userSetRoleError.FailedToSetUserRole({ e });
        }
        return user;
    }
};
exports.UserSetRoleService = UserSetRoleService;
exports.UserSetRoleService = UserSetRoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_component_1.UserComponent,
        farm_component_1.FarmComponent])
], UserSetRoleService);
//# sourceMappingURL=user-set-role.service.js.map