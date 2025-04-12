"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokensErrors = exports.refreshAccessTokenErrors = exports.RefreshAccessTokenErrors = exports.GenerateTokensErrors = void 0;
const common_1 = require("@nestjs/common");
const base_error_1 = require("./base.error");
class GenerateTokensErrors extends base_error_1.BaseError {
    constructor() {
        super('');
        this.FailedToUpdateUser = this.createError(common_1.InternalServerErrorException, 'failedToUpdateUser', 'Failed to update a user');
    }
}
exports.GenerateTokensErrors = GenerateTokensErrors;
class RefreshAccessTokenErrors extends base_error_1.BaseError {
    constructor() {
        super('');
        this.RefreshTokenVerificationFailed = this.createError(common_1.UnauthorizedException, 'refreshTokenVerificationError', 'Refresh token verification failed');
        this.UserDoesNotExist = this.createError(common_1.UnauthorizedException, 'userDoesNotExist', 'User does not exist');
        this.InvalidRefreshToken = this.createError(common_1.UnauthorizedException, 'invalidRefreshToken', 'Invalid refresh token');
    }
}
exports.RefreshAccessTokenErrors = RefreshAccessTokenErrors;
exports.refreshAccessTokenErrors = new RefreshAccessTokenErrors();
exports.generateTokensErrors = new GenerateTokensErrors();
//# sourceMappingURL=token-service.errors.js.map