"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = void 0;
const http_1 = require("../../constants/http");
const _1 = require(".");
class UnauthorizedError extends _1.ExtendableError {
    constructor(descriptor, statusCode = http_1.HTTP_STATUS_CODE.UNAUTHORIZED) {
        super(descriptor || "Unathorized", statusCode);
    }
    static create(descriptor, statusCode = http_1.HTTP_STATUS_CODE.UNAUTHORIZED) {
        const instance = new UnauthorizedError(descriptor, statusCode);
        return instance;
    }
}
exports.UnauthorizedError = UnauthorizedError;
