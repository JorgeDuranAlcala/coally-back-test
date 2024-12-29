"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIDgenerator = void 0;
const uuid_1 = require("uuid");
class UIDgenerator {
    static create() {
        return new UIDgenerator();
    }
    gen() {
        return (0, uuid_1.v4)();
    }
}
exports.UIDgenerator = UIDgenerator;
