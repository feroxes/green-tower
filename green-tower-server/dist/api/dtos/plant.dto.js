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
exports.PlantListDto = exports.PlantListSortersDto = exports.PlantListFiltersDto = exports.PlantDeleteDto = exports.PlantGetDto = exports.PlantUpdateDto = exports.PlantCreateDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const plant_entity_1 = require("../../entities/plant.entity");
const common_types_1 = require("../types/common.types");
const dto_types_1 = require("../types/dto-types");
class PlantCreateDto {
}
exports.PlantCreateDto = PlantCreateDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], PlantCreateDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(2024),
    __metadata("design:type", String)
], PlantCreateDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(2024),
    __metadata("design:type", String)
], PlantCreateDto.prototype, "notes", void 0);
__decorate([
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(512),
    __metadata("design:type", String)
], PlantCreateDto.prototype, "imageUrl", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(plant_entity_1.PlantType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PlantCreateDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], PlantCreateDto.prototype, "expectedHoursToHarvest", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], PlantCreateDto.prototype, "hoursToSoak", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], PlantCreateDto.prototype, "hoursToMoveToLight", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PlantCreateDto.prototype, "shouldBePressed", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], PlantCreateDto.prototype, "seedsGramPerPlate", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], PlantCreateDto.prototype, "expectedHarvestGramsPerPlate", void 0);
class PlantUpdateDto {
}
exports.PlantUpdateDto = PlantUpdateDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PlantUpdateDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], PlantUpdateDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(2024),
    __metadata("design:type", String)
], PlantUpdateDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(2024),
    __metadata("design:type", String)
], PlantUpdateDto.prototype, "notes", void 0);
__decorate([
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(512),
    __metadata("design:type", String)
], PlantUpdateDto.prototype, "imageUrl", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(plant_entity_1.PlantType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PlantUpdateDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], PlantUpdateDto.prototype, "expectedHoursToHarvest", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], PlantUpdateDto.prototype, "hoursToSoak", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], PlantUpdateDto.prototype, "hoursToMoveToLight", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PlantUpdateDto.prototype, "shouldBePressed", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], PlantUpdateDto.prototype, "seedsGramPerPlate", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], PlantUpdateDto.prototype, "expectedHarvestGramsPerPlate", void 0);
class PlantGetDto {
}
exports.PlantGetDto = PlantGetDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PlantGetDto.prototype, "id", void 0);
class PlantDeleteDto {
}
exports.PlantDeleteDto = PlantDeleteDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PlantDeleteDto.prototype, "id", void 0);
class PlantListFiltersDto {
}
exports.PlantListFiltersDto = PlantListFiltersDto;
__decorate([
    (0, class_validator_1.IsEnum)(plant_entity_1.PlantType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PlantListFiltersDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PlantListFiltersDto.prototype, "createdBy", void 0);
class PlantListSortersDto {
}
exports.PlantListSortersDto = PlantListSortersDto;
__decorate([
    (0, class_validator_1.IsEnum)(common_types_1.SortDirectionType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PlantListSortersDto.prototype, "createdAt", void 0);
class PlantListDto {
}
exports.PlantListDto = PlantListDto;
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => dto_types_1.ListMetaDto),
    __metadata("design:type", dto_types_1.ListMetaDto)
], PlantListDto.prototype, "meta", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => PlantListFiltersDto),
    __metadata("design:type", PlantListFiltersDto)
], PlantListDto.prototype, "filters", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => PlantListSortersDto),
    __metadata("design:type", PlantListSortersDto)
], PlantListDto.prototype, "sorters", void 0);
//# sourceMappingURL=plant.dto.js.map