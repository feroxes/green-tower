"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCheckExistenceComponentError = exports.UserCreateComponentError = void 0;
const common_1 = require("@nestjs/common");
const base_error_1 = require("./base.error");
class UserCreateComponentError extends base_error_1.BaseError {
    constructor(code) {
        super(code);
        this.UserAlreadyExists = this.createError(common_1.ConflictException, 'userAlreadyExists', 'User with this email already exists');
        this.FailedToCreateUser = this.createError(common_1.InternalServerErrorException, 'failedToCreateUser', 'Failed to create a User');
    }
}
exports.UserCreateComponentError = UserCreateComponentError;
class UserCheckExistenceComponentError extends base_error_1.BaseError {
    constructor(code) {
        super(code);
        this.UserNotFound = this.createError(common_1.NotFoundException, 'userNotFound', 'User not found');
    }
}
exports.UserCheckExistenceComponentError = UserCheckExistenceComponentError;
//# sourceMappingURL=user-component.errors.js.map