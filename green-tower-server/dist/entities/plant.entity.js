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
exports.Plant = exports.PlantType = void 0;
const typeorm_1 = require("typeorm");
const farm_entity_1 = require("./farm.entity");
const user_entity_1 = require("./user.entity");
var PlantType;
(function (PlantType) {
    PlantType["MICROGREEN"] = "microgreen";
    PlantType["COMMON"] = "common";
})(PlantType || (exports.PlantType = PlantType = {}));
let Plant = class Plant {
};
exports.Plant = Plant;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Plant.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 120 }),
    __metadata("design:type", String)
], Plant.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 2048 }),
    __metadata("design:type", String)
], Plant.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 2048 }),
    __metadata("design:type", String)
], Plant.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 512 }),
    __metadata("design:type", String)
], Plant.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PlantType,
        default: PlantType.MICROGREEN,
    }),
    __metadata("design:type", String)
], Plant.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Plant.prototype, "expectedHoursToHarvest", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Plant.prototype, "hoursToSoak", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Plant.prototype, "hoursToMoveToLight", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Plant.prototype, "shouldBePressed", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Plant.prototype, "seedsGramPerPlate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Plant.prototype, "expectedHarvestGramsPerPlate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => farm_entity_1.Farm, (farm) => farm.plants),
    (0, typeorm_1.JoinColumn)({ name: 'farmId' }),
    __metadata("design:type", farm_entity_1.Farm)
], Plant.prototype, "farm", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.plants),
    (0, typeorm_1.JoinColumn)({ name: 'createdById' }),
    __metadata("design:type", user_entity_1.User)
], Plant.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.VersionColumn)(),
    __metadata("design:type", Number)
], Plant.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Plant.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Plant.prototype, "updatedAt", void 0);
exports.Plant = Plant = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Index)('IDX_PLANT_CREATED_AT', ['createdAt'])
], Plant);
//# sourceMappingURL=plant.entity.js.map