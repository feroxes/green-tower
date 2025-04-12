"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenMiddlewareErrors = exports.RefreshTokenMiddlewareErrors = void 0;
const common_1 = require("@nestjs/common");
const base_error_1 = require("./base.error");
class RefreshTokenMiddlewareErrors extends base_error_1.BaseError {
    constructor() {
        super('');
        this.NoAuthorizationHeader = this.createError(common_1.UnauthorizedException, 'noAuthorizationHeader', 'No authorization header');
        this.NoTokenProvided = this.createError(common_1.UnauthorizedException, 'noTokenProvided', 'No token provided');
        this.NoRefreshTokenProvided = this.createError(common_1.UnauthorizedException, 'noRefreshTokenProvided', 'No refresh token provided');
        this.InvalidToken = this.createError(common_1.UnauthorizedException, 'invalidToken', 'Invalid token');
    }
}
exports.RefreshTokenMiddlewareErrors = RefreshTokenMiddlewareErrors;
exports.refreshTokenMiddlewareErrors = new RefreshTokenMiddlewareErrors();
//# sourceMappingURL=refresh-token-middleware.errors.js.map