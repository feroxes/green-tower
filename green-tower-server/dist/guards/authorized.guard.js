"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizedGuard = void 0;
const user_entity_1 = require("../entities/user.entity");
class AuthorizedGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        if (!request.user) {
            return false;
        }
        return (request.user.role === user_entity_1.UserRole.OWNER ||
            request.user.role === user_entity_1.UserRole.ADMIN ||
            request.user.role === user_entity_1.UserRole.USER);
    }
}
exports.AuthorizedGuard = AuthorizedGuard;
//# sourceMappingURL=authorized.guard.js.map