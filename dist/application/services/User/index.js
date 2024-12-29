"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const in_memory_user_repository_1 = require("../../../infrastructure/InMemory/in-memory-user-repository");
const user_service_1 = require("./user.service");
const mongo_user_repository_1 = require("../../../infrastructure/mongo/mongo-user-repository");
const userRepository = process.env.NODE_ENV === 'test' ? new in_memory_user_repository_1.InMemoryUserRepository() : new mongo_user_repository_1.MongoUserRepository();
const userService = new user_service_1.UserService(userRepository);
exports.userService = userService;
