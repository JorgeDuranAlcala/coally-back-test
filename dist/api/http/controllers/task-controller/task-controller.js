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
exports.TaskController = void 0;
const base_controller_1 = require("../base-controller");
const createTaskDto_1 = require("../../../../application/dtos/createTaskDto");
const updateTaskDto_1 = require("../../../../application/dtos/updateTaskDto");
class TaskController extends base_controller_1.BaseController {
    constructor(taskService, validator) {
        super();
        this.taskService = taskService;
        this.validator = validator;
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const taskDto = this.bodyParser(createTaskDto_1.CreateTaskDto, req.body);
                yield this.validator.validate(taskDto);
                const task = yield this.taskService.createTask(taskDto);
                return this.ok(res, { task: this.transformToPlainObj(task.toJSON()) });
            }
            catch (error) {
                next(error);
            }
        });
        this.getAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const completed = req.query.completed === 'true' ? true :
                    req.query.completed === 'false' ? false : undefined;
                const userId = req.query.userId ? String(req.query.userId) : undefined;
                const tasks = yield this.taskService.getAllTasks({ completed, userId: String(userId).length > 0 ? userId : undefined });
                return this.ok(res, { tasks: tasks.map(task => this.transformToPlainObj(task.toJSON())) });
            }
            catch (error) {
                next(error);
            }
        });
        this.getById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield this.taskService.getTaskById(req.params.id);
                return this.ok(res, { task: this.transformToPlainObj(task.toJSON()) });
            }
            catch (error) {
                next(error);
            }
        });
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const taskDto = this.bodyParser(updateTaskDto_1.UpdateTaskDto, req.body);
                yield this.validator.validate(taskDto);
                const task = yield this.taskService.updateTask(req.params.id, taskDto);
                return this.ok(res, { task: this.transformToPlainObj(task.toJSON()) });
            }
            catch (error) {
                next(error);
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.taskService.deleteTask(req.params.id);
                return this.ok(res);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.TaskController = TaskController;
