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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_create_service_1 = require("./user-create.service");
const user_delete_service_1 = require("./user-delete.service");
const user_get_service_1 = require("./user-get.service");
const user_list_service_1 = require("./user-list.service");
const user_set_role_service_1 = require("./user-set-role.service");
const user_update_service_1 = require("./user-update.service");
let UserService = class UserService {
    constructor(userCreateService, userUpdateService, userDeleteService, userSetRoleService, userGetService, userListService) {
        this.userCreateService = userCreateService;
        this.userUpdateService = userUpdateService;
        this.userDeleteService = userDeleteService;
        this.userSetRoleService = userSetRoleService;
        this.userGetService = userGetService;
        this.userListService = userListService;
    }
    async create(userCreateDto, executor) {
        return this.userCreateService.create(userCreateDto, executor);
    }
    async update(userUpdateDto, executor) {
        return this.userUpdateService.update(userUpdateDto, executor);
    }
    async delete(userDeleteDto, executor) {
        return this.userDeleteService.delete(userDeleteDto, executor);
    }
    async setRole(userSetRoleDto, executor) {
        return this.userSetRoleService.setRole(userSetRoleDto, executor);
    }
    async get(userGetDto, executor) {
        return this.userGetService.get(userGetDto, executor);
    }
    async list(executor) {
        return this.userListService.list(executor);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_create_service_1.UserCreateService,
        user_update_service_1.UserUpdateService,
        user_delete_service_1.UserDeleteService,
        user_set_role_service_1.UserSetRoleService,
        user_get_service_1.UserGetService,
        user_list_service_1.UserListService])
], UserService);
//# sourceMappingURL=user.service.js.map