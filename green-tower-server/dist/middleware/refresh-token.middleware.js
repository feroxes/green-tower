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
exports.RefreshTokenMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const cookie_1 = require("cookie");
const token_service_1 = require("../services/token/token.service");
const refresh_token_middleware_errors_1 = require("../api/errors/refresh-token-middleware.errors");
let RefreshTokenMiddleware = class RefreshTokenMiddleware {
    constructor(jwtService, tokenService) {
        this.jwtService = jwtService;
        this.tokenService = tokenService;
    }
    async use(req, res, next) {
        const authHeader = req.headers.authorization;
        const cookieHeader = req.headers.cookie ?? '';
        const parsedCookies = (0, cookie_1.parse)(cookieHeader);
        if (!authHeader) {
            throw refresh_token_middleware_errors_1.refreshTokenMiddlewareErrors.NoAuthorizationHeader();
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            throw refresh_token_middleware_errors_1.refreshTokenMiddlewareErrors.NoTokenProvided();
        }
        try {
            req['user'] = this.jwtService.verify(token);
            next();
        }
        catch (error) {
            if (error instanceof Error && error.name === 'TokenExpiredError') {
                const refreshToken = parsedCookies['refreshToken'];
                if (!refreshToken) {
                    throw refresh_token_middleware_errors_1.refreshTokenMiddlewareErrors.NoRefreshTokenProvided();
                }
                const newAccessToken = await this.tokenService.refreshAccessToken(refreshToken);
                req['user'] = this.jwtService.verify(newAccessToken);
                req.headers.authorization = `Bearer ${newAccessToken}`;
                res.setHeader('New-Access-Token', 'Bearer ' + newAccessToken);
                next();
            }
            else {
                throw refresh_token_middleware_errors_1.refreshTokenMiddlewareErrors.InvalidToken();
            }
        }
    }
};
exports.RefreshTokenMiddleware = RefreshTokenMiddleware;
exports.RefreshTokenMiddleware = RefreshTokenMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        token_service_1.TokenService])
], RefreshTokenMiddleware);
//# sourceMappingURL=refresh-token.middleware.js.map