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
exports.TaskService = void 0;
const NotFound_1 = require("../../../libs/Error/NotFound");
class TaskService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    createTask(taskData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.taskRepository.create(taskData);
        });
    }
    getTaskById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.taskRepository.findById(id);
            if (!task)
                throw NotFound_1.NotFoundError.create('Task not found');
            return task;
        });
    }
    getAllTasks(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.taskRepository.findAll(filter);
        });
    }
    updateTask(id, taskData) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.taskRepository.update(id, taskData);
            if (!task)
                throw NotFound_1.NotFoundError.create('Task not found');
            return task;
        });
    }
    deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.getTaskById(id);
            yield this.taskRepository.delete(id);
            return task;
        });
    }
}
exports.TaskService = TaskService;
