"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPasswordStrong = void 0;
const class_validator_1 = require("class-validator");
const passRegExp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
const constraints = [
    "The string must contain at least 1 lowercase alphabetical character",
    "The string must contain at least 1 uppercase alphabetical character",
    "The string must contain at least 1 numeric character",
    "The string must contain at least one special character",
    "The string must be eight characters or longer",
];
let IsPasswordStrong = class IsPasswordStrong {
    validate(text) {
        return passRegExp.test(text); // for async validations you must return a Promise<boolean> here
    }
    defaultMessage() {
        // here you can provide default error message if validation failed
        return `The password is not strong enough, it must be lacking one of this conditions ${constraints.join("\n")}`;
    }
};
IsPasswordStrong = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: "password-validator", async: false })
], IsPasswordStrong);
exports.IsPasswordStrong = IsPasswordStrong;
