import { CreateTaskDto } from "../dto/createTaskDto";
import { TaskModel } from "../models/task-model";

export interface ITaskRepository {
  create(task: CreateTaskDto): Promise<TaskModel>;
  findById(id: string): Promise<TaskModel | null>;
  findAll(filter?: { completed?: boolean, userId?: string }): Promise<TaskModel[]>;
  update(id: string, task: Partial<CreateTaskDto>): Promise<TaskModel | null>;
  delete(id: string): Promise<void>;
}