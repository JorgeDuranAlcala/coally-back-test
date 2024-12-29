"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskService = void 0;
const in_memory_task_repository_1 = require("../../../infrastructure/InMemory/in-memory-task-repository");
const task_service_1 = require("./task.service");
const mongo_task_repository_1 = require("../../../infrastructure/mongo/mongo-task-repository");
const taskRepository = process.env.NODE_ENV === 'test' ? new in_memory_task_repository_1.InMemoryTaskRepository() : new mongo_task_repository_1.MongoTaskRepository();
const taskService = new task_service_1.TaskService(taskRepository);
exports.taskService = taskService;
