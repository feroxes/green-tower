"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseError = void 0;
class BaseError {
    constructor(code) {
        this.code = code;
    }
    createError(ExceptionClass, errorKey, message) {
        return (params = {}) => {
            return new ExceptionClass({
                errorCode: `${this.code}${errorKey}`,
                message,
                params,
            });
        };
    }
}
exports.BaseError = BaseError;
//# sourceMappingURL=base.error.js.map