import { InMemoryTaskRepository } from "src/infrastructure/InMemory/in-memory-task-repository";
import { TaskService } from "./task.service";
import { MongoTaskRepository } from "src/infrastructure/mongo/mongo-task-repository";
const taskRepository = process.env.NODE_ENV === 'test' ? new InMemoryTaskRepository() : new MongoTaskRepository();

const taskService = new TaskService(taskRepository);
export { taskService };