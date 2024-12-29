import { InMemoryTaskRepository } from "../../../infrastructure/InMemory/in-memory-task-repository";
import { TaskService } from "./task.service";
import { MongoTaskRepository } from "../../../infrastructure/mongo/mongo-task-repository";
const taskRepository = process.env.NODE_ENV === 'test' ? new InMemoryTaskRepository() : new MongoTaskRepository();

const taskService = new TaskService(taskRepository);
export { taskService };