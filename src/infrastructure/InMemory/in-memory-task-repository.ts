import { CreateTaskDto } from "src/domain/dto/createTaskDto";
import { ITaskRepository } from "src/domain/infrastructure/task.repository";
import { TaskModel } from "src/domain/models/task-model";

export class InMemoryTaskRepository implements ITaskRepository {
  private tasks: Map<string, TaskModel> = new Map();
  private currentId = 1;

  async create(task: CreateTaskDto): Promise<TaskModel> {
    const id = this.currentId.toString();
    this.currentId++;
    const newTask = TaskModel.hydrate({ ...task, id, createdAt: new Date(), updatedAt: new Date() });
    this.tasks.set(id, newTask);
    return newTask;
  }

  async findById(id: string): Promise<TaskModel | null> {
    const task = this.tasks.get(id);
    return task || null;
  }

  async findAll(filter?: { completed?: boolean, userId?: string }): Promise<TaskModel[]> {
    let tasks = Array.from(this.tasks.values());
    if (filter?.completed !== undefined) {
      tasks = tasks.filter(task => task.toJSON().completed === filter.completed);
    }
    if (filter?.userId) {
      tasks = tasks.filter(task => task.toJSON().userId === filter.userId);
    }
    return tasks;
  }

  async update(id: string, taskData: Partial<CreateTaskDto>): Promise<TaskModel | null> {
    const existingTask = this.tasks.get(id);
    if (!existingTask) return null;
    
    const updatedTask = TaskModel.hydrate({ ...existingTask.toJSON() , ...taskData });
    this.tasks.set(id, updatedTask);
    return updatedTask;
  }

  async delete(id: string): Promise<void> {
    this.tasks.delete(id);
  }
}
