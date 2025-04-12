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
exports.FarmController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const owner_guard_1 = require("../../guards/owner.guard");
const farm_service_1 = require("../../services/farm/farm.service");
const farm_dto_1 = require("../dtos/farm.dto");
const executor_decorator_1 = require("../../decorators/executor.decorator");
let FarmController = class FarmController {
    constructor(farmService) {
        this.farmService = farmService;
    }
    async get(farmGetDto, executor) {
        return this.farmService.get(farmGetDto, executor);
    }
};
exports.FarmController = FarmController;
__decorate([
    (0, common_1.Get)('get'),
    (0, common_1.UseGuards)(owner_guard_1.OwnerGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, executor_decorator_1.Executor)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [farm_dto_1.FarmGetDto, Object]),
    __metadata("design:returntype", Promise)
], FarmController.prototype, "get", null);
exports.FarmController = FarmController = __decorate([
    (0, common_1.Controller)('farm'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [farm_service_1.FarmService])
], FarmController);
//# sourceMappingURL=farm.controller.js.map