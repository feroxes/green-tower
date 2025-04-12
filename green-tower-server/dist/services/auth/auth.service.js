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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const auth_confirm_email_service_1 = require("./auth-confirm-email.service");
const auth_login_service_1 = require("./auth-login.service");
const auth_resend_confirmation_email_service_1 = require("./auth-resend-confirmation-email.service");
const auth_signup_service_1 = require("./auth-signup.service");
let AuthService = class AuthService {
    constructor(authSignupService, authLoginService, authConfirmEmailService, authResendConfirmationEmail) {
        this.authSignupService = authSignupService;
        this.authLoginService = authLoginService;
        this.authConfirmEmailService = authConfirmEmailService;
        this.authResendConfirmationEmail = authResendConfirmationEmail;
    }
    register(registerDto) {
        return this.authSignupService.register(registerDto);
    }
    login(loginDto) {
        return this.authLoginService.login(loginDto);
    }
    confirmEmail(confirmEmailDto) {
        return this.authConfirmEmailService.confirmEmail(confirmEmailDto);
    }
    resendConfirmationEmail(resendConfirmationEmailDto) {
        return this.authResendConfirmationEmail.resend(resendConfirmationEmailDto);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_signup_service_1.AuthSignupService,
        auth_login_service_1.AuthLoginService,
        auth_confirm_email_service_1.AuthConfirmEmailService,
        auth_resend_confirmation_email_service_1.AuthResendConfirmationEmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map