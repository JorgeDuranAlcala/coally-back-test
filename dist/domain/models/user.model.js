"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserModel {
    constructor(id, name, email, password, createdAt, updatedAt) {
        this._id = id;
        this._name = name;
        this._email = email;
        this._password = password;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
    }
    toJSON() {
        return {
            id: this._id,
            name: this._name,
            email: this._email,
            password: this._password,
            createdAt: this._createdAt,
            updatedAt: this._updatedAt
        };
    }
    generateToken() {
        // Generate token
        const token = jsonwebtoken_1.default.sign({ id: this._id }, process.env.JWT_SECRET, {
            expiresIn: '3h'
        });
        return token;
    }
    static hydrate(data) {
        return new UserModel(String(data.id), data.name, data.email, data.password, data.createdAt, data.updatedAt);
    }
}
exports.UserModel = UserModel;
