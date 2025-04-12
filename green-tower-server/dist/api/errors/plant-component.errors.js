"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlantComponentError = void 0;
const common_1 = require("@nestjs/common");
const base_error_1 = require("./base.error");
class PlantComponentError extends base_error_1.BaseError {
    constructor(code) {
        super(code);
        this.PlantNotFound = this.createError(common_1.NotFoundException, 'plantNotFound', 'Plant not found');
    }
}
exports.PlantComponentError = PlantComponentError;
//# sourceMappingURL=plant-component.errors.js.map