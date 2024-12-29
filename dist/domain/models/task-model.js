"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModel = void 0;
class TaskModel {
    constructor(id, title, userId, description, completed, createdAt, updatedAt) {
        this._id = id;
        this._title = title;
        this._userId = userId;
        this._description = description;
        this._completed = completed;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
    }
    toJSON() {
        return {
            id: this._id,
            title: this._title,
            userId: this._userId,
            description: this._description,
            completed: this._completed,
            createdAt: this._createdAt,
            updatedAt: this._updatedAt
        };
    }
    static hydrate(data) {
        return new TaskModel(String(data.id), data.title, data.userId, data.description, data.completed, data.createdAt, data.updatedAt);
    }
}
exports.TaskModel = TaskModel;
