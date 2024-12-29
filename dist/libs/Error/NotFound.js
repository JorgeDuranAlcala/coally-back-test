"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const http_1 = require("../../constants/http");
const _1 = require(".");
class NotFoundError extends _1.ExtendableError {
    constructor(descriptor, statusCode = http_1.HTTP_STATUS_CODE.NOT_FOUND) {
        super(descriptor || "Resource not found", statusCode);
    }
    static create(descriptor, statusCode = http_1.HTTP_STATUS_CODE.NOT_FOUND) {
        const instance = new NotFoundError(descriptor, statusCode);
        return instance;
    }
}
exports.NotFoundError = NotFoundError;
