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
exports.InMemoryTaskRepository = void 0;
const task_model_1 = require("../../domain/models/task-model");
class InMemoryTaskRepository {
    constructor() {
        this.tasks = new Map();
        this.currentId = 1;
    }
    create(task) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.currentId.toString();
            this.currentId++;
            const newTask = task_model_1.TaskModel.hydrate(Object.assign(Object.assign({}, task), { id, createdAt: new Date(), updatedAt: new Date() }));
            this.tasks.set(id, newTask);
            return newTask;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = this.tasks.get(id);
            return task || null;
        });
    }
    findAll(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            let tasks = Array.from(this.tasks.values());
            if ((filter === null || filter === void 0 ? void 0 : filter.completed) !== undefined) {
                tasks = tasks.filter(task => task.toJSON().completed === filter.completed);
            }
            if (filter === null || filter === void 0 ? void 0 : filter.userId) {
                tasks = tasks.filter(task => task.toJSON().userId === filter.userId);
            }
            return tasks;
        });
    }
    update(id, taskData) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingTask = this.tasks.get(id);
            if (!existingTask)
                return null;
            const updatedTask = task_model_1.TaskModel.hydrate(Object.assign(Object.assign({}, existingTask.toJSON()), taskData));
            this.tasks.set(id, updatedTask);
            return updatedTask;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.tasks.delete(id);
        });
    }
}
exports.InMemoryTaskRepository = InMemoryTaskRepository;
