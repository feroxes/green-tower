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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const authorized_guard_1 = require("../../guards/authorized.guard");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const owner_guard_1 = require("../../guards/owner.guard");
const user_service_1 = require("../../services/user/user.service");
const user_dto_1 = require("../dtos/user.dto");
const executor_decorator_1 = require("../../decorators/executor.decorator");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async create(userCreateDto, executor) {
        return this.userService.create(userCreateDto, executor);
    }
    async update(userUpdateDto, executor) {
        return this.userService.update(userUpdateDto, executor);
    }
    async delete(userDeleteDto, executor) {
        return this.userService.delete(userDeleteDto, executor);
    }
    async setRole(userSetRoleDto, executor) {
        return this.userService.setRole(userSetRoleDto, executor);
    }
    async get(userGetDto, executor) {
        return this.userService.get(userGetDto, executor);
    }
    async list(executor) {
        return this.userService.list(executor);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseGuards)(owner_guard_1.OwnerGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, executor_decorator_1.Executor)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserCreateCmdDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('update'),
    (0, common_1.UseGuards)(authorized_guard_1.AuthorizedGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, executor_decorator_1.Executor)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserUpdateDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('delete'),
    (0, common_1.UseGuards)(owner_guard_1.OwnerGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, executor_decorator_1.Executor)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDeleteDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('setRole'),
    (0, common_1.UseGuards)(owner_guard_1.OwnerGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, executor_decorator_1.Executor)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserSetRoleDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "setRole", null);
__decorate([
    (0, common_1.Get)('get'),
    (0, common_1.UseGuards)(authorized_guard_1.AuthorizedGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, executor_decorator_1.Executor)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserGetDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "get", null);
__decorate([
    (0, common_1.Get)('list'),
    (0, common_1.UseGuards)(owner_guard_1.OwnerGuard),
    __param(0, (0, executor_decorator_1.Executor)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "list", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map