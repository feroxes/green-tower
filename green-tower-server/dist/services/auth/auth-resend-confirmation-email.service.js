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
exports.AuthResendConfirmationEmailService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../entities/user.entity");
const email_service_1 = require("../email/email.service");
const token_service_1 = require("../token/token.service");
const auth_errors_1 = require("../../api/errors/auth.errors");
const constants_1 = require("../../utils/constants");
let AuthResendConfirmationEmailService = class AuthResendConfirmationEmailService {
    constructor(userRepository, tokenService, emailService) {
        this.userRepository = userRepository;
        this.tokenService = tokenService;
        this.emailService = emailService;
    }
    async resend(resendConfirmationEmailDto) {
        const { email } = resendConfirmationEmailDto;
        const user = await this.userRepository.findOne({
            where: { email },
        });
        if (!user) {
            throw auth_errors_1.resendConfirmationEmailError.UserDoesNotExist();
        }
        if (user.isEmailConfirmed) {
            throw auth_errors_1.resendConfirmationEmailError.EmailAlreadyConfirmed();
        }
        const confirmationToken = this.tokenService.generateEmailConfirmationToken();
        const emailConfirmationExpires = new Date();
        emailConfirmationExpires.setHours(emailConfirmationExpires.getHours() + constants_1.AuthConstants.EMAIL_CONFIRMATION_EXPIRES_HOURS);
        user.emailConfirmationToken = confirmationToken;
        user.emailConfirmationExpires = emailConfirmationExpires;
        try {
            await this.userRepository.save(user);
        }
        catch (e) {
            throw auth_errors_1.resendConfirmationEmailError.FailedToUpdateUser({ e });
        }
        try {
            await this.emailService.sendEmailConfirmation(user.email, user.emailConfirmationToken);
        }
        catch (e) {
            throw auth_errors_1.registerError.FailedToSendConfirmationEmail({ e });
        }
        return {};
    }
};
exports.AuthResendConfirmationEmailService = AuthResendConfirmationEmailService;
exports.AuthResendConfirmationEmailService = AuthResendConfirmationEmailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        token_service_1.TokenService,
        email_service_1.EmailService])
], AuthResendConfirmationEmailService);
//# sourceMappingURL=auth-resend-confirmation-email.service.js.map