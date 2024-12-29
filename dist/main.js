"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const http_1 = require("./api/http");
function main() {
    http_1.expressServer.start();
}
main();
