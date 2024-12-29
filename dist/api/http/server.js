"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressApp = void 0;
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const http_1 = require("http");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const mongo_connection_1 = require("../../config/database/mongo-connection");
dotenv_1.default.config();
const importSwagger = () => __awaiter(void 0, void 0, void 0, function* () { return yield Promise.resolve().then(() => __importStar(require("./swagger"))); });
class ExpressApp {
    constructor(_router, _errorHandler) {
        this._router = _router;
        this._errorHandler = _errorHandler;
        this._app = (0, express_1.default)();
        this.settings();
        this.middlewares();
        this.initRoutes();
    }
    static create(_router, _errorHandler) {
        const instance = new ExpressApp(_router, _errorHandler);
        return instance;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            const port = this._app.get("port");
            const httpServer = (0, http_1.createServer)(this._app);
            yield (0, mongo_connection_1.connectDB)();
            httpServer.listen(port, () => {
                console.log(`Server running on port ${port}`);
            });
        });
    }
    settings() {
        this._app.set("port", process.env.PORT || 4000);
        this._app.set("api-version", process.env.API_VERSION || "1");
    }
    middlewares() {
        this._app.use((0, compression_1.default)());
        this._app.use((0, helmet_1.default)());
        this._app.use((0, cors_1.default)());
        this._app.use((0, morgan_1.default)('dev'));
        this._app.use(express_1.default.json({ limit: "5mb" }));
    }
    initRoutes() {
        return __awaiter(this, void 0, void 0, function* () {
            const router = this._router.get();
            this._app.use(`/api/v${this._app.get("api-version")}`, router);
            const sd = yield importSwagger();
            sd.swaggerDocs(this._app, this._app.get("port"));
            this._app.use("*", this._errorHandler.NOT_FOUND_ROUTE_HANDLER);
            if (process.env.NODE_ENV === "development")
                this._app.use(this._errorHandler.logErrorMiddleware);
            this._app.use(this._errorHandler.returnError);
        });
    }
    get app() {
        return this._app;
    }
}
exports.ExpressApp = ExpressApp;
