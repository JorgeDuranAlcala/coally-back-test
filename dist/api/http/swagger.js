"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerDocs = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Hello World",
            version: "1.0.0",
        },
    },
    apis: ["./src/api/http/controllers/user-controller/user-controller.ts"], // files containing annotations as above
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
const swaggerDocs = (app, port) => {
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    console.log(`Docs servers running at http://localhost:${port}/api-docs`);
};
exports.swaggerDocs = swaggerDocs;
