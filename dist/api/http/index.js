"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressServer = void 0;
const error_handler_1 = require("./middlewares/error-handler");
const router_1 = require("./router");
const server_1 = require("./server");
const _errorHandler = new error_handler_1.ErrorHandler();
const expressServer = server_1.ExpressApp.create(router_1.router, _errorHandler);
exports.expressServer = expressServer;
