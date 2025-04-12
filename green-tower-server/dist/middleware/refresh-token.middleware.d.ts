import { NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { TokenService } from '../services/token/token.service';
export declare class RefreshTokenMiddleware implements NestMiddleware {
    private jwtService;
    private tokenService;
    constructor(jwtService: JwtService, tokenService: TokenService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
