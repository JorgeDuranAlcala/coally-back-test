import { UserService } from "./user-service";
import { inMemoryUserRepo } from "@src/infrastructure/userRepository";
import dotenv from "dotenv";
import { sqlUserRepo } from "@src/infrastructure/userRepository/";
dotenv.config();

export const userService = UserService.create(
  process.env.NODE_ENV !== "test" ? sqlUserRepo : inMemoryUserRepo
);
