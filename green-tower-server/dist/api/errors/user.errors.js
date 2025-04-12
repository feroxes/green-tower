"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSetRoleError = exports.userDeleteError = exports.userGetError = exports.userUpdateError = exports.userCreateError = void 0;
const common_1 = require("@nestjs/common");
const base_error_1 = require("./base.error");
class UserCreateError extends base_error_1.BaseError {
    constructor() {
        super('user/create/');
        this.FailedToSendConfirmationEmail = this.createError(common_1.InternalServerErrorException, 'failedToSendConfirmationEmail', 'Failed to send confirmation email');
    }
}
class UserUpdateError extends base_error_1.BaseError {
    constructor() {
        super('user/update/');
        this.UserUpdateForbidden = this.createError(common_1.ForbiddenException, 'userUpdateForbidden', 'User update forbidden');
        this.FailedToUpdateUser = this.createError(common_1.InternalServerErrorException, 'failedToUpdateUser', 'Failed to update a User');
    }
}
class UserGetError extends base_error_1.BaseError {
    constructor() {
        super('user/get/');
        this.UserGetForbidden = this.createError(common_1.ForbiddenException, 'userGetForbidden', 'User get forbidden');
    }
}
class UserDeleteError extends base_error_1.BaseError {
    constructor() {
        super('user/delete/');
        this.OwnerCouldNotBeDeleted = this.createError(common_1.ForbiddenException, 'ownerCouldNotBeDeleted', 'Owner could not be deleted');
        this.FailedToDeleteUser = this.createError(common_1.InternalServerErrorException, 'failedToDeleteUser', 'Failed to delete a User');
    }
}
class UserSetRoleError extends base_error_1.BaseError {
    constructor() {
        super('user/setRole/');
        this.OwnerCouldNotBeUpdated = this.createError(common_1.ForbiddenException, 'ownerCouldNotBeUpdated', 'Owner could not be updated');
        this.FailedToSetUserRole = this.createError(common_1.InternalServerErrorException, 'failedToSetUserRole', 'Failed to set user role');
    }
}
exports.userCreateError = new UserCreateError();
exports.userUpdateError = new UserUpdateError();
exports.userGetError = new UserGetError();
exports.userDeleteError = new UserDeleteError();
exports.userSetRoleError = new UserSetRoleError();
//# sourceMappingURL=user.errors.js.map