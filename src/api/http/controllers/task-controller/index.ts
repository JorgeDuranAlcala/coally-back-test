import { taskService } from "../../../../application/services/Task/task";
import { TaskController } from "./task-controller";
import { Validator } from "../../../../libs/Validator/validator";

const validator = Validator.create();
export const taskController = new TaskController(taskService, validator);
