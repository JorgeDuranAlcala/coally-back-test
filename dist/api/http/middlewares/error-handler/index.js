"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const http_1 = require("../../../../constants/http");
const Error_1 = require("../../../../libs/Error");
class ErrorHandler {
    constructor() {
        this.logError = (err) => {
            console.error(new Date(Date.now()), err.message);
        };
        this.logErrorMiddleware = (err, req, res, next) => {
            this.logError(err);
            next(err);
        };
        this.returnError = (err, req, res) => {
            if (err instanceof Error_1.ExtendableError) {
                return res === null || res === void 0 ? void 0 : res.status(err.statusCode).send(err.message);
            }
            return res === null || res === void 0 ? void 0 : res.status(http_1.HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send(err.message);
        };
        this.NOT_FOUND_ROUTE_HANDLER = (req, res) => {
            return res.status(http_1.HTTP_STATUS_CODE.NOT_FOUND).send("Opps. 404 not found");
        };
    }
}
exports.ErrorHandler = ErrorHandler;
