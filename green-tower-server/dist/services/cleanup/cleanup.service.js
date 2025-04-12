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
exports.CleanupService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const typeorm_3 = require("typeorm");
const farm_entity_1 = require("../../entities/farm.entity");
const user_entity_1 = require("../../entities/user.entity");
let CleanupService = class CleanupService {
    constructor(userRepository, farmRepository) {
        this.userRepository = userRepository;
        this.farmRepository = farmRepository;
    }
    async removeUnconfirmedUsers() {
        const unconfirmedUsers = await this.userRepository.find({
            where: {
                isEmailConfirmed: false,
                emailConfirmationExpires: (0, typeorm_3.LessThan)(new Date()),
            },
            relations: ['farm'],
        });
        if (unconfirmedUsers.length > 0) {
            for (const user of unconfirmedUsers) {
                if (user.farm) {
                    const farm = await this.farmRepository.findOne({
                        where: { owner: { id: user.id } },
                        relations: ['users', 'plants'],
                    });
                    if (farm) {
                        farm.users = [];
                        farm.plants = [];
                        await this.farmRepository.save(farm);
                        await this.farmRepository.remove(farm);
                    }
                }
            }
            await this.userRepository.remove(unconfirmedUsers);
        }
    }
};
exports.CleanupService = CleanupService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CleanupService.prototype, "removeUnconfirmedUsers", null);
exports.CleanupService = CleanupService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(farm_entity_1.Farm)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CleanupService);
//# sourceMappingURL=cleanup.service.js.map