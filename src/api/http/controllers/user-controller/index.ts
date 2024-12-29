import { Validator } from "src/libs/Validator/validator";
import { UserController } from "./user-controller";
import { userService } from "src/application/services/User";

const validator = Validator.create();
export const userController = new UserController(userService, validator);
