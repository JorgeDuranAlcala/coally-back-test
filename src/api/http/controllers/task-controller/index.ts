import { Validator } from "../../../../libs/Validator/validator";
import { TaskController } from "./task-controller";
import { taskService } from "../../../../application/services/Task";

const validator = Validator.create();
export const taskController = new TaskController(taskService, validator);
