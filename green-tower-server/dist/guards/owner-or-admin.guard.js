"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OwnerOrAdminGuard = void 0;
const user_entity_1 = require("../entities/user.entity");
class OwnerOrAdminGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        if (!request.user) {
            return false;
        }
        return request.user.role === user_entity_1.UserRole.OWNER || request.user.role === user_entity_1.UserRole.ADMIN;
    }
}
exports.OwnerOrAdminGuard = OwnerOrAdminGuard;
//# sourceMappingURL=owner-or-admin.guard.js.map