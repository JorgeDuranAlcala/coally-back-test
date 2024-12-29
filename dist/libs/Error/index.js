"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendableError = void 0;
class ExtendableError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ExtendableError = ExtendableError;
