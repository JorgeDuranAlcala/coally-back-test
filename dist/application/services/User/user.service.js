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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const InvalidPassword_1 = require("../../..//libs/Error/InvalidPassword");
const NotFound_1 = require("../../..//libs/Error/NotFound");
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield this.userRepository.findByEmail(userData.email);
            if (existingUser) {
                throw new Error('User with this email already exists');
            }
            const password = bcrypt_1.default.hashSync(userData.password, 10);
            return this.userRepository.create(Object.assign(Object.assign({}, userData), { password }));
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findById(id);
            if (!user) {
                throw NotFound_1.NotFoundError.create('User not found');
            }
            return user;
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByEmail(email);
            if (!user) {
                throw NotFound_1.NotFoundError.create('User not found');
            }
            const isValidPassword = bcrypt_1.default.compareSync(password, user.toJSON().password);
            if (!isValidPassword) {
                throw InvalidPassword_1.InvalidPasswordError.create('Invalid password');
            }
            return user;
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findAll();
        });
    }
    updateUser(id, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedUser = yield this.userRepository.update(id, userData);
            if (!updatedUser) {
                throw new Error('User not found');
            }
            return updatedUser;
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getUserById(id); // Verify user exists
            yield this.userRepository.delete(id);
        });
    }
}
exports.UserService = UserService;
