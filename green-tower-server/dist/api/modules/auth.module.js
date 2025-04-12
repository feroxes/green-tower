"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_strategy_1 = require("../../strategies/jwt.strategy");
const farm_entity_1 = require("../../entities/farm.entity");
const user_entity_1 = require("../../entities/user.entity");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_service_1 = require("../../services/auth/auth.service");
const auth_confirm_email_service_1 = require("../../services/auth/auth-confirm-email.service");
const auth_login_service_1 = require("../../services/auth/auth-login.service");
const auth_resend_confirmation_email_service_1 = require("../../services/auth/auth-resend-confirmation-email.service");
const auth_signup_service_1 = require("../../services/auth/auth-signup.service");
const email_service_1 = require("../../services/email/email.service");
const token_service_1 = require("../../services/token/token.service");
const farm_component_1 = require("../../components/farm.component");
const user_component_1 = require("../../components/user.component");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, farm_entity_1.Farm])],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            auth_login_service_1.AuthLoginService,
            auth_signup_service_1.AuthSignupService,
            auth_confirm_email_service_1.AuthConfirmEmailService,
            auth_resend_confirmation_email_service_1.AuthResendConfirmationEmailService,
            email_service_1.EmailService,
            token_service_1.TokenService,
            farm_component_1.FarmComponent,
            user_component_1.UserComponent,
            jwt_strategy_1.JwtStrategy,
        ],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map