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
exports.PlantController = void 0;
const common_1 = require("@nestjs/common");
const authorized_guard_1 = require("../../guards/authorized.guard");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const owner_or_admin_guard_1 = require("../../guards/owner-or-admin.guard");
const plant_service_1 = require("../../services/plant/plant.service");
const plant_dto_1 = require("../dtos/plant.dto");
const executor_decorator_1 = require("../../decorators/executor.decorator");
let PlantController = class PlantController {
    constructor(plantService) {
        this.plantService = plantService;
    }
    async create(plantCreateDto, executor) {
        return this.plantService.create(plantCreateDto, executor);
    }
    async update(plantUpdateDto, executor) {
        return this.plantService.update(plantUpdateDto, executor);
    }
    async get(plantGetDto, executor) {
        return this.plantService.get(plantGetDto, executor);
    }
    async delete(plantDeleteDto, executor) {
        return this.plantService.delete(plantDeleteDto, executor);
    }
    async let(plantListDto, executor) {
        return this.plantService.list(plantListDto, executor);
    }
};
exports.PlantController = PlantController;
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseGuards)(owner_or_admin_guard_1.OwnerOrAdminGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, executor_decorator_1.Executor)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [plant_dto_1.PlantCreateDto, Object]),
    __metadata("design:returntype", Promise)
], PlantController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('update'),
    (0, common_1.UseGuards)(owner_or_admin_guard_1.OwnerOrAdminGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, executor_decorator_1.Executor)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [plant_dto_1.PlantUpdateDto, Object]),
    __metadata("design:returntype", Promise)
], PlantController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('get'),
    (0, common_1.UseGuards)(authorized_guard_1.AuthorizedGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, executor_decorator_1.Executor)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [plant_dto_1.PlantGetDto, Object]),
    __metadata("design:returntype", Promise)
], PlantController.prototype, "get", null);
__decorate([
    (0, common_1.Post)('delete'),
    (0, common_1.UseGuards)(owner_or_admin_guard_1.OwnerOrAdminGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, executor_decorator_1.Executor)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [plant_dto_1.PlantDeleteDto, Object]),
    __metadata("design:returntype", Promise)
], PlantController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('list'),
    (0, common_1.UseGuards)(authorized_guard_1.AuthorizedGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, executor_decorator_1.Executor)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [plant_dto_1.PlantListDto, Object]),
    __metadata("design:returntype", Promise)
], PlantController.prototype, "let", null);
exports.PlantController = PlantController = __decorate([
    (0, common_1.Controller)('plant'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [plant_service_1.PlantService])
], PlantController);
//# sourceMappingURL=plant.controller.js.map