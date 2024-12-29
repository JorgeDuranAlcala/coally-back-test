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
exports.MongoTaskRepository = void 0;
const task_model_1 = require("../../database/mongo/task-model");
const task_model_2 = require("../../domain/models/task-model");
class MongoTaskRepository {
    constructor() {
        this.model = task_model_1.Task;
    }
    create(task) {
        return __awaiter(this, void 0, void 0, function* () {
            const newTask = yield this.model.create(task);
            return task_model_2.TaskModel.hydrate(Object.assign(Object.assign({}, newTask.toObject()), { id: newTask._id.toString() }));
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.model.findById(id);
            return task ? task_model_2.TaskModel.hydrate(Object.assign(Object.assign({}, task.toObject()), { id: task._id.toString() })) : null;
        });
    }
    findAll(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const filterObj = {};
            if ((filter === null || filter === void 0 ? void 0 : filter.completed) !== undefined) {
                filterObj.completed = filter.completed;
            }
            if (filter === null || filter === void 0 ? void 0 : filter.userId) {
                filterObj.userId = filter.userId;
            }
            const tasks = yield this.model.find(filterObj);
            return tasks.map(task => task_model_2.TaskModel.hydrate(Object.assign(Object.assign({}, task.toObject()), { id: task._id.toString() })));
        });
    }
    update(id, taskData) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.model.findByIdAndUpdate(id, taskData, { new: true });
            return task ? task_model_2.TaskModel.hydrate(Object.assign(Object.assign({}, task.toObject()), { id: task._id.toString() })) : null;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.model.findByIdAndDelete(id);
        });
    }
}
exports.MongoTaskRepository = MongoTaskRepository;
