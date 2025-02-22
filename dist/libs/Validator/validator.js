"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const class_validator_1 = require("class-validator");
const Malformed_data_1 = require("../Error/Malformed-data");
class Validator {
    static create() {
        return new Validator();
    }
    validate(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = yield (0, class_validator_1.validate)(data);
            if (errors.length > 0)
                throw Malformed_data_1.MalformedDataError.create(this.formatErrorData(errors));
            return true;
        });
    }
    formatErrorData(errors) {
        return "Error: ".concat(errors
            .map((error) => Object.values(error.constraints || {}))
            .join(", "));
    }
}
exports.Validator = Validator;
