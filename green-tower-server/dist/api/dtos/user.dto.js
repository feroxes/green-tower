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
exports.UserListFiltersDto = exports.UserGetDto = exports.UserSetRoleDto = exports.UserDeleteDto = exports.UserUpdateDto = exports.UserCreateCmdDto = exports.UserCreateDto = void 0;
const class_validator_1 = require("class-validator");
const user_entity_1 = require("../../entities/user.entity");
class UserCreateDto {
}
exports.UserCreateDto = UserCreateDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(30),
    __metadata("design:type", String)
], UserCreateDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(30),
    __metadata("design:type", String)
], UserCreateDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(40),
    __metadata("design:type", String)
], UserCreateDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(40),
    __metadata("design:type", String)
], UserCreateDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(user_entity_1.UserRole),
    __metadata("design:type", String)
], UserCreateDto.prototype, "role", void 0);
class UserCreateCmdDto {
}
exports.UserCreateCmdDto = UserCreateCmdDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(30),
    __metadata("design:type", String)
], UserCreateCmdDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(30),
    __metadata("design:type", String)
], UserCreateCmdDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(40),
    __metadata("design:type", String)
], UserCreateCmdDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(40),
    __metadata("design:type", String)
], UserCreateCmdDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(user_entity_1.UserRole, { message: 'Role must be either admin or user' }),
    __metadata("design:type", String)
], UserCreateCmdDto.prototype, "role", void 0);
class UserUpdateDto {
}
exports.UserUpdateDto = UserUpdateDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UserUpdateDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(30),
    __metadata("design:type", String)
], UserUpdateDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(30),
    __metadata("design:type", String)
], UserUpdateDto.prototype, "lastName", void 0);
class UserDeleteDto {
}
exports.UserDeleteDto = UserDeleteDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UserDeleteDto.prototype, "id", void 0);
class UserSetRoleDto {
}
exports.UserSetRoleDto = UserSetRoleDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UserSetRoleDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(user_entity_1.UserRole, { message: 'Role must be either admin or user' }),
    __metadata("design:type", String)
], UserSetRoleDto.prototype, "role", void 0);
class UserGetDto {
}
exports.UserGetDto = UserGetDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UserGetDto.prototype, "id", void 0);
class UserListFiltersDto {
}
exports.UserListFiltersDto = UserListFiltersDto;
//# sourceMappingURL=user.dto.js.map