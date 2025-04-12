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
exports.UserComponent = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const token_service_1 = require("../services/token/token.service");
const user_component_errors_1 = require("../api/errors/user-component.errors");
const common_types_1 = require("../api/types/common.types");
const dto_types_1 = require("../api/types/dto-types");
const list_decorator_1 = require("../decorators/list.decorator");
const constants_1 = require("../utils/constants");
let UserComponent = class UserComponent {
    constructor(userRepository, tokenService) {
        this.userRepository = userRepository;
        this.tokenService = tokenService;
    }
    async create(createDto, farm, errorCode) {
        const Errors = new user_component_errors_1.UserCreateComponentError(errorCode);
        const existingUser = await this.userRepository.findOne({
            where: { email: createDto.email },
        });
        if (existingUser) {
            throw Errors.UserAlreadyExists();
        }
        const hashedPassword = await bcrypt.hash(createDto.password, 10);
        let user = this.userRepository.create({
            ...createDto,
            password: hashedPassword,
        });
        user.farm = farm;
        const confirmationToken = this.tokenService.generateEmailConfirmationToken();
        const emailConfirmationExpires = new Date();
        emailConfirmationExpires.setHours(emailConfirmationExpires.getHours() + constants_1.AuthConstants.EMAIL_CONFIRMATION_EXPIRES_HOURS);
        user.emailConfirmationToken = confirmationToken;
        user.emailConfirmationExpires = emailConfirmationExpires;
        user.isEmailConfirmed = false;
        try {
            user = await this.userRepository.save(user);
        }
        catch (e) {
            throw Errors.FailedToCreateUser({ e });
        }
        return { user };
    }
    async list(executor, meta) {
        return Promise.resolve({ itemList: [], meta: { page: 0, size: 0, total: 0 } });
    }
    async checkUserExistence(id, farmId, errorCode) {
        const Errors = new user_component_errors_1.UserCheckExistenceComponentError(errorCode);
        const user = await this.userRepository.findOne({ where: { id, farm: { id: farmId } } });
        if (!user) {
            throw Errors.UserNotFound({ id });
        }
        return user;
    }
};
exports.UserComponent = UserComponent;
__decorate([
    (0, list_decorator_1.List)({
        entity: user_entity_1.User,
        relations: ['farm', 'plants'],
        defaultSort: { field: 'createdAt', order: common_types_1.SortDirectionType.DESC },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_types_1.ListMetaDto]),
    __metadata("design:returntype", Promise)
], UserComponent.prototype, "list", null);
exports.UserComponent = UserComponent = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        token_service_1.TokenService])
], UserComponent);
//# sourceMappingURL=user.component.js.map