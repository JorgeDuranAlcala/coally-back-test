"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidPasswordError = void 0;
const http_1 = require("../../constants/http");
const _1 = require(".");
class InvalidPasswordError extends _1.ExtendableError {
    constructor(descriptor, statusCode = http_1.HTTP_STATUS_CODE.UNAUTHORIZED) {
        super(descriptor || "Invalid password provided", statusCode);
    }
    static create(descriptor, statusCode = http_1.HTTP_STATUS_CODE.UNAUTHORIZED) {
        const instance = new InvalidPasswordError(descriptor, statusCode);
        return instance;
    }
}
exports.InvalidPasswordError = InvalidPasswordError;
