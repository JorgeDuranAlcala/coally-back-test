"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const class_transformer_1 = require("class-transformer");
const http_1 = require("../../../constants/http");
class BaseController {
    ok(res, result) {
        return res.status(http_1.HTTP_STATUS_CODE.OK).send(result);
    }
    bodyParser(dtoClass, body) {
        const dto = (0, class_transformer_1.plainToInstance)(dtoClass, body, {
            excludeExtraneousValues: true,
            exposeDefaultValues: false,
        });
        return dto;
    }
    transformToPlainObj(dtoObj) {
        return (0, class_transformer_1.instanceToPlain)(dtoObj);
    }
}
exports.BaseController = BaseController;
