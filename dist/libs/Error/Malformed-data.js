"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MalformedDataError = void 0;
const http_1 = require("../../constants/http");
const _1 = require(".");
class MalformedDataError extends _1.ExtendableError {
    constructor(descriptor, statusCode = http_1.HTTP_STATUS_CODE.MALFORMED_DATA) {
        super(descriptor || "Malformed expected data", statusCode);
    }
    static create(descriptor, statusCode = http_1.HTTP_STATUS_CODE.MALFORMED_DATA) {
        const instance = new MalformedDataError(descriptor, statusCode);
        return instance;
    }
}
exports.MalformedDataError = MalformedDataError;
