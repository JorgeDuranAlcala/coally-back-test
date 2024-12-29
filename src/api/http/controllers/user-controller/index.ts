import { userService } from "@src/application/services/User";
import { UserController } from "./user-controller";
import { Validator } from "@src/libs/Validator/validator";

const validator = Validator.create();
export const userController = new UserController(userService, validator);
