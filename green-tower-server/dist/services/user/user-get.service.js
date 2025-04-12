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
exports.UserGetService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../../entities/user.entity");
const user_component_1 = require("../../components/user.component");
const user_errors_1 = require("../../api/errors/user.errors");
let UserGetService = class UserGetService {
    constructor(userComponent) {
        this.userComponent = userComponent;
    }
    async get(userGetDto, executor) {
        const useCase = 'user/get/';
        const _executor = await this.userComponent.checkUserExistence(executor.id, executor.farmId, useCase);
        if (userGetDto.id && userGetDto.id !== executor.id) {
            if (executor.role !== user_entity_1.UserRole.OWNER) {
                throw user_errors_1.userGetError.UserGetForbidden();
            }
        }
        if (!userGetDto.id || userGetDto.id === executor.id) {
            return _executor;
        }
        return await this.userComponent.checkUserExistence(userGetDto.id, executor.farmId, useCase);
    }
};
exports.UserGetService = UserGetService;
exports.UserGetService = UserGetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_component_1.UserComponent])
], UserGetService);
//# sourceMappingURL=user-get.service.js.map