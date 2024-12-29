import { ITaskService } from "../../../domain/application/task-service.interface";
import { CreateTaskDto } from "../../..//domain/dto/createTaskDto";
import { ITaskRepository } from "../../..//domain/infrastructure/task.repository";
import { TaskModel } from "../../..//domain/models/task-model";
import { NotFoundError } from "../../../libs/Error/NotFound";

export class TaskService implements ITaskService {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async createTask(taskData: CreateTaskDto): Promise<TaskModel> {
    return this.taskRepository.create(taskData);
  }

  async getTaskById(id: string): Promise<TaskModel> {
    const task = await this.taskRepository.findById(id);
    if (!task) throw NotFoundError.create('Task not found');
    return task;
  }

  async getAllTasks(filter: {completed?: boolean, userId?: string}): Promise<TaskModel[]> {
    return this.taskRepository.findAll(filter);
  }

  async updateTask(id: string, taskData: Partial<CreateTaskDto>): Promise<TaskModel> {
    const task = await this.taskRepository.update(id, taskData);
    if (!task) throw NotFoundError.create('Task not found');
    return task;
  }

  async deleteTask(id: string): Promise<TaskModel> {
    const task = await this.getTaskById(id);
    await this.taskRepository.delete(id);
    return task;
  }
}
