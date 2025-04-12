import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class AuthorizedGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
