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
exports.UserListService = void 0;
const common_1 = require("@nestjs/common");
const user_component_1 = require("../../components/user.component");
let UserListService = class UserListService {
    constructor(userComponent) {
        this.userComponent = userComponent;
    }
    async list(executor) {
        const useCase = 'user/list/';
        await this.userComponent.checkUserExistence(executor.id, executor.farmId, useCase);
        return this.userComponent.list(executor);
    }
};
exports.UserListService = UserListService;
exports.UserListService = UserListService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_component_1.UserComponent])
], UserListService);
//# sourceMappingURL=user-list.service.js.map