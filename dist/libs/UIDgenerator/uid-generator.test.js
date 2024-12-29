"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uid_generator_1 = require("./uid-generator");
describe("UIDgenerator class", () => {
    let uidGenerator;
    beforeEach(() => {
        uidGenerator = uid_generator_1.UIDgenerator.create();
    });
    test("should gen an unique id", () => {
        const id = uidGenerator.gen();
        expect(id).toBeDefined();
        expect(id).not.toEqual("");
    });
});
