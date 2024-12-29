import { taskService } from "src/application/services/Task";
import { TaskController } from "./task-controller";
import { Validator } from "src/libs/Validator/validator";

const validator = Validator.create();
export const taskController = new TaskController(taskService, validator);
