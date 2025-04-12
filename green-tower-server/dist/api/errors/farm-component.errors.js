"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmGetComponentError = void 0;
const common_1 = require("@nestjs/common");
const base_error_1 = require("./base.error");
class FarmGetComponentError extends base_error_1.BaseError {
    constructor(code) {
        super(code);
        this.FarmNotFound = this.createError(common_1.NotFoundException, 'farmNotFound', 'Farm not found');
    }
}
exports.FarmGetComponentError = FarmGetComponentError;
//# sourceMappingURL=farm-component.errors.js.map