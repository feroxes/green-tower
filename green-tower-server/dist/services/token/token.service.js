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
exports.TokenService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const user_entity_1 = require("../../entities/user.entity");
const token_service_errors_1 = require("../../api/errors/token-service.errors");
const constants_1 = require("../../utils/constants");
let TokenService = class TokenService {
    constructor(jwtService, userRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }
    generateEmailConfirmationToken() {
        return crypto.randomBytes(32).toString('hex');
    }
    async generateTokens(user) {
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
            farmId: user.farm.id,
        };
        const refreshTokenPayload = {
            sub: user.id,
            token: (0, uuid_1.v4)(),
        };
        user.refreshToken = await bcrypt.hash(refreshTokenPayload.token, 10);
        try {
            await this.userRepository.save(user);
        }
        catch (e) {
            throw token_service_errors_1.generateTokensErrors.FailedToUpdateUser({ e });
        }
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: constants_1.AuthConstants.ACCESS_TOKEN_EXPIRATION,
        });
        const refreshToken = this.jwtService.sign(refreshTokenPayload, {
            expiresIn: constants_1.AuthConstants.REFRESH_TOKEN_EXPIRATION,
        });
        return { accessToken, refreshToken };
    }
    async refreshAccessToken(refreshToken) {
        let refreshTokenPayload;
        try {
            refreshTokenPayload = this.jwtService.verify(refreshToken);
        }
        catch (e) {
            throw token_service_errors_1.refreshAccessTokenErrors.RefreshTokenVerificationFailed({ e });
        }
        const user = await this.userRepository.findOne({
            where: { id: refreshTokenPayload.sub },
            relations: ['farm'],
        });
        if (!user || !user.refreshToken) {
            throw token_service_errors_1.refreshAccessTokenErrors.UserDoesNotExist();
        }
        const isValid = await bcrypt.compare(refreshTokenPayload.token, user.refreshToken);
        if (!isValid) {
            throw token_service_errors_1.refreshAccessTokenErrors.InvalidRefreshToken();
        }
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
            farmId: user.farm.id,
        };
        return this.jwtService.sign(payload, {
            expiresIn: constants_1.AuthConstants.ACCESS_TOKEN_EXPIRATION,
        });
    }
};
exports.TokenService = TokenService;
exports.TokenService = TokenService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        typeorm_2.Repository])
], TokenService);
//# sourceMappingURL=token.service.js.map