import { InMemoryUserRepository } from "src/infrastructure/InMemory/in-memory-user-repository";
import { UserService } from "./user.service";
import { MongoUserRepository } from "src/infrastructure/mongo/mongo-user-repository";

const userRepository = process.env.NODE_ENV === 'test' ? new InMemoryUserRepository() : new MongoUserRepository();
const userService = new UserService(userRepository);

export { userService };