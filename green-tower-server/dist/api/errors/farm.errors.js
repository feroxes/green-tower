"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getError = exports.FarmGetError = void 0;
const common_1 = require("@nestjs/common");
const base_error_1 = require("./base.error");
class FarmGetError extends base_error_1.BaseError {
    constructor() {
        super('farm/get/');
        this.FarmNotFound = this.createError(common_1.NotFoundException, 'farmNotFound', 'Farm not found');
        this.Forbidden = this.createError(common_1.ForbiddenException, 'forbidden', 'You do not have permission to access this farm');
    }
}
exports.FarmGetError = FarmGetError;
exports.getError = new FarmGetError();
//# sourceMappingURL=farm.errors.js.map