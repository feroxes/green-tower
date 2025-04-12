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
exports.AuthSignupService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const farm_entity_1 = require("../../entities/farm.entity");
const user_entity_1 = require("../../entities/user.entity");
const email_service_1 = require("../email/email.service");
const user_component_1 = require("../../components/user.component");
const auth_errors_1 = require("../../api/errors/auth.errors");
let AuthSignupService = class AuthSignupService {
    constructor(userRepository, farmRepository, userComponent, emailService) {
        this.userRepository = userRepository;
        this.farmRepository = farmRepository;
        this.userComponent = userComponent;
        this.emailService = emailService;
    }
    async register(registerDto) {
        let farm = this.farmRepository.create({
            name: registerDto.farmName,
        });
        const createUserDto = { ...registerDto, role: user_entity_1.UserRole.OWNER };
        delete createUserDto.farmName;
        const { user } = await this.userComponent.create(createUserDto, farm, 'auth/register/');
        farm.owner = user;
        try {
            farm = await this.farmRepository.save(farm);
        }
        catch (e) {
            await this.userRepository.remove(user);
            throw auth_errors_1.registerError.FailedToCreateFarm({ e });
        }
        try {
            await this.userRepository.save({ ...user, farm });
        }
        catch (e) {
            await this.userRepository.remove(user);
            await this.farmRepository.remove(farm);
            throw auth_errors_1.registerError.FailedToUpdateUser({ e });
        }
        try {
            await this.emailService.sendEmailConfirmation(user.email, user.emailConfirmationToken);
        }
        catch (e) {
            throw auth_errors_1.registerError.FailedToSendConfirmationEmail({ e });
        }
        return {};
    }
};
exports.AuthSignupService = AuthSignupService;
exports.AuthSignupService = AuthSignupService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(farm_entity_1.Farm)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        user_component_1.UserComponent,
        email_service_1.EmailService])
], AuthSignupService);
//# sourceMappingURL=auth-signup.service.js.map