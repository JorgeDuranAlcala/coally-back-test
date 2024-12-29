"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const validator_1 = require("../../../../libs/Validator/validator");
const user_controller_1 = require("./user-controller");
const user_1 = require("../../../../application/services/User/user");
const validator = validator_1.Validator.create();
exports.userController = new user_controller_1.UserController(user_1.userService, validator);
