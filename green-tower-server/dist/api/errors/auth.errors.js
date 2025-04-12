"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resendConfirmationEmailError = exports.confirmEmailError = exports.loginError = exports.registerError = exports.ResendConfirmationEmailError = exports.ConfirmEmailError = exports.RegisterError = void 0;
const common_1 = require("@nestjs/common");
const base_error_1 = require("./base.error");
class RegisterError extends base_error_1.BaseError {
    constructor() {
        super('auth/register/');
        this.FailedToCreateFarm = this.createError(common_1.InternalServerErrorException, 'failedToCreateFarm', 'Failed to create a farm');
        this.FailedToUpdateUser = this.createError(common_1.InternalServerErrorException, 'failedToUpdateUser', 'Failed to update a user');
        this.FailedToSendConfirmationEmail = this.createError(common_1.InternalServerErrorException, 'failedToSendConfirmationEmail', 'Failed to send confirmation email');
    }
}
exports.RegisterError = RegisterError;
class LoginError extends base_error_1.BaseError {
    constructor() {
        super('auth/login/');
        this.InvalidCredentials = this.createError(common_1.UnauthorizedException, 'invalidCredentials', 'Invalid credentials');
        this.EmailNotConfirmed = this.createError(common_1.UnauthorizedException, 'emailNotConfirmed', 'Please confirm your email before logging in');
    }
}
class ConfirmEmailError extends base_error_1.BaseError {
    constructor() {
        super('auth/confirmEmail/');
        this.InvalidConfirmationToken = this.createError(common_1.ConflictException, 'invalidConfirmationToken', 'Invalid or expired confirmation token');
        this.ConfirmationTokenExpired = this.createError(common_1.ConflictException, 'confirmationTokenExpired', 'Confirmation token has expired');
        this.FailedToUpdateUser = this.createError(common_1.InternalServerErrorException, 'failedToUpdateUser', 'Failed to update a user');
    }
}
exports.ConfirmEmailError = ConfirmEmailError;
class ResendConfirmationEmailError extends base_error_1.BaseError {
    constructor() {
        super('auth/resendConfirmationEmail/');
        this.UserDoesNotExist = this.createError(common_1.ConflictException, 'userDoesNotExist', 'User does not exist');
        this.EmailAlreadyConfirmed = this.createError(common_1.ConflictException, 'emailAlreadyConfirmed', 'Email already confirmed');
        this.FailedToUpdateUser = this.createError(common_1.InternalServerErrorException, 'failedToUpdateUser', 'Failed to update a user');
    }
}
exports.ResendConfirmationEmailError = ResendConfirmationEmailError;
exports.registerError = new RegisterError();
exports.loginError = new LoginError();
exports.confirmEmailError = new ConfirmEmailError();
exports.resendConfirmationEmailError = new ResendConfirmationEmailError();
//# sourceMappingURL=auth.errors.js.map