"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_strategy_1 = require("../../strategies/jwt.strategy");
const farm_entity_1 = require("../../entities/farm.entity");
const user_entity_1 = require("../../entities/user.entity");
const user_controller_1 = require("../controllers/user.controller");
const email_service_1 = require("../../services/email/email.service");
const token_service_1 = require("../../services/token/token.service");
const user_service_1 = require("../../services/user/user.service");
const user_create_service_1 = require("../../services/user/user-create.service");
const user_delete_service_1 = require("../../services/user/user-delete.service");
const user_get_service_1 = require("../../services/user/user-get.service");
const user_list_service_1 = require("../../services/user/user-list.service");
const user_set_role_service_1 = require("../../services/user/user-set-role.service");
const user_update_service_1 = require("../../services/user/user-update.service");
const farm_component_1 = require("../../components/farm.component");
const user_component_1 = require("../../components/user.component");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, farm_entity_1.Farm])],
        controllers: [user_controller_1.UserController],
        providers: [
            user_service_1.UserService,
            user_create_service_1.UserCreateService,
            user_delete_service_1.UserDeleteService,
            user_get_service_1.UserGetService,
            user_list_service_1.UserListService,
            user_set_role_service_1.UserSetRoleService,
            user_update_service_1.UserUpdateService,
            jwt_strategy_1.JwtStrategy,
            farm_component_1.FarmComponent,
            token_service_1.TokenService,
            email_service_1.EmailService,
            user_component_1.UserComponent,
        ],
        exports: [user_service_1.UserService],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map