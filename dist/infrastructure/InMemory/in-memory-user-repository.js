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
exports.InMemoryUserRepository = void 0;
const user_model_1 = require("../../domain/models/user.model");
class InMemoryUserRepository {
    constructor() {
        this.users = new Map();
        this.currentId = 1;
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.currentId.toString();
            this.currentId++;
            const newUser = Object.assign(Object.assign({}, user), { id });
            this.users.set(id, newUser);
            return user_model_1.UserModel.hydrate(newUser);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.users.get(id);
            return user ? user_model_1.UserModel.hydrate(user) : null;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = Array.from(this.users.values()).find(u => u.email === email);
            return user ? user_model_1.UserModel.hydrate(user) : null;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return Array.from(this.users.values()).map(user => user_model_1.UserModel.hydrate(user));
        });
    }
    update(id, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = this.users.get(id);
            if (!existingUser)
                return null;
            const updatedUser = Object.assign(Object.assign({}, existingUser), userData);
            this.users.set(id, updatedUser);
            return user_model_1.UserModel.hydrate(updatedUser);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.users.delete(id);
        });
    }
}
exports.InMemoryUserRepository = InMemoryUserRepository;
