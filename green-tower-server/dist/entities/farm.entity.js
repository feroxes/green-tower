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
exports.Farm = void 0;
const typeorm_1 = require("typeorm");
const plant_entity_1 = require("./plant.entity");
const user_entity_1 = require("./user.entity");
const constants_1 = require("../utils/constants");
let Farm = class Farm {
};
exports.Farm = Farm;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Farm.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: constants_1.FarmConstants.NAME_MAX_LENGTH }),
    __metadata("design:type", String)
], Farm.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'ownerId' }),
    __metadata("design:type", user_entity_1.User)
], Farm.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.User, (user) => user.farm),
    __metadata("design:type", Array)
], Farm.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => plant_entity_1.Plant, (user) => user.farm),
    __metadata("design:type", Array)
], Farm.prototype, "plants", void 0);
__decorate([
    (0, typeorm_1.VersionColumn)(),
    __metadata("design:type", Number)
], Farm.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Farm.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Farm.prototype, "updatedAt", void 0);
exports.Farm = Farm = __decorate([
    (0, typeorm_1.Entity)()
], Farm);
//# sourceMappingURL=farm.entity.js.map