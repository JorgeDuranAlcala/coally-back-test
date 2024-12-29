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
exports.MongoUserRepository = void 0;
const user_model_1 = require("../../database/mongo/user-model");
const user_model_2 = require("../../domain/models/user.model");
class MongoUserRepository {
    constructor() {
        this.model = user_model_1.User;
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = yield this.model.create(user);
            return user_model_2.UserModel.hydrate(Object.assign(Object.assign({}, newUser.toObject()), { id: newUser._id.toString() }));
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.model.findById(id);
            return user ? user_model_2.UserModel.hydrate(Object.assign(Object.assign({}, user.toObject()), { id: user._id.toString() })) : null;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.model.findOne({ email });
            return user ? user_model_2.UserModel.hydrate(Object.assign(Object.assign({}, user.toObject()), { id: user._id.toString() })) : null;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.model.find();
            return users.map(user => user_model_2.UserModel.hydrate(Object.assign(Object.assign({}, user.toObject()), { id: user._id.toString() })));
        });
    }
    update(id, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.model.findByIdAndUpdate(id, userData, { new: true });
            return user ? user_model_2.UserModel.hydrate(Object.assign(Object.assign({}, user.toObject()), { id: user._id.toString() })) : null;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.model.findByIdAndDelete(id);
        });
    }
}
exports.MongoUserRepository = MongoUserRepository;
