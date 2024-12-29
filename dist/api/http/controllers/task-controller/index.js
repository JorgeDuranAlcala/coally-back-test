"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskController = void 0;
const task_1 = require("../../../../application/services/Task/task");
const task_controller_1 = require("./task-controller");
const validator_1 = require("../../../../libs/Validator/validator");
const validator = validator_1.Validator.create();
exports.taskController = new task_controller_1.TaskController(task_1.taskService, validator);
