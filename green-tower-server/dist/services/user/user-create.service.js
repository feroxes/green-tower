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
exports.UserCreateService = void 0;
const common_1 = require("@nestjs/common");
const email_service_1 = require("../email/email.service");
const farm_component_1 = require("../../components/farm.component");
const user_component_1 = require("../../components/user.component");
const user_errors_1 = require("../../api/errors/user.errors");
let UserCreateService = class UserCreateService {
    constructor(userComponent, farmComponent, emailService) {
        this.userComponent = userComponent;
        this.farmComponent = farmComponent;
        this.emailService = emailService;
    }
    async create(userCreateDto, executor) {
        const useCase = 'user/create/';
        await this.userComponent.checkUserExistence(executor.id, executor.farmId, useCase);
        const farm = await this.farmComponent.checkFarmExistence(executor.farmId, useCase);
        const { user } = await this.userComponent.create(userCreateDto, farm, useCase);
        try {
            await this.emailService.sendEmailConfirmation(user.email, user.emailConfirmationToken);
        }
        catch (e) {
            throw user_errors_1.userCreateError.FailedToSendConfirmationEmail({ e });
        }
        return user;
    }
};
exports.UserCreateService = UserCreateService;
exports.UserCreateService = UserCreateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_component_1.UserComponent,
        farm_component_1.FarmComponent,
        email_service_1.EmailService])
], UserCreateService);
//# sourceMappingURL=user-create.service.js.map