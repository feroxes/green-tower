"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OwnerGuard = void 0;
const user_entity_1 = require("../entities/user.entity");
class OwnerGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        if (!request.user) {
            return false;
        }
        return request.user.role === user_entity_1.UserRole.OWNER;
    }
}
exports.OwnerGuard = OwnerGuard;
//# sourceMappingURL=owner.guard.js.map