"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plantDeleteError = exports.plantUpdateError = exports.plantCreateError = void 0;
const common_1 = require("@nestjs/common");
const base_error_1 = require("./base.error");
class PlantCreateError extends base_error_1.BaseError {
    constructor() {
        super('plant/create/');
        this.FailedToCreatePlant = this.createError(common_1.InternalServerErrorException, 'failedToCreatePlant', 'Failed to create a Plant');
    }
}
class PlantUpdateError extends base_error_1.BaseError {
    constructor() {
        super('plant/update/');
        this.FailedToUpdatePlant = this.createError(common_1.InternalServerErrorException, 'failedToUpdatePlant', 'Failed to update a Plant');
    }
}
class PlantDeleteError extends base_error_1.BaseError {
    constructor() {
        super('plant/delete/');
        this.FailedToDeletePlant = this.createError(common_1.InternalServerErrorException, 'failedToDeletePlant', 'Failed to delete a Plant');
    }
}
exports.plantCreateError = new PlantCreateError();
exports.plantUpdateError = new PlantUpdateError();
exports.plantDeleteError = new PlantDeleteError();
//# sourceMappingURL=plant.errors.js.map