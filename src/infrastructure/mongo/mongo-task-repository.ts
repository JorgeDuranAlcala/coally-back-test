import { Task } from "src/database/mongo/task-model";
import { CreateTaskDto } from "src/domain/dto/createTaskDto";
import { ITaskRepository } from "src/domain/infrastructure/task.repository";
import { TaskModel } from "src/domain/models/task-model";

export class MongoTaskRepository implements ITaskRepository {
  private model: typeof Task;

  constructor() {
    this.model = Task;
  }

  async create(task: CreateTaskDto): Promise<TaskModel> {
    const newTask = await this.model.create(task);
    return TaskModel.hydrate({ ...newTask.toObject(), id: newTask._id.toString() });
  }

  async findById(id: string): Promise<TaskModel | null> {
    const task = await this.model.findById(id);
    return task ? TaskModel.hydrate({ ...task.toObject(), id: task._id.toString() }) : null;
  }

  async findAll(filter?: { completed?: boolean, userId?: string }): Promise<TaskModel[]> {
    const filterObj: Record<string, unknown> = {};
    if (filter?.completed !== undefined) {
      filterObj.completed = filter.completed;
    }
    if (filter?.userId) {
      filterObj.userId = filter.userId;
    }
    const tasks = await this.model.find(filterObj);
    return tasks.map(task => TaskModel.hydrate({ ...task.toObject(), id: task._id.toString() }));
  }

  async update(id: string, taskData: Partial<CreateTaskDto>): Promise<TaskModel | null> {
    const task = await this.model.findByIdAndUpdate(id, taskData, { new: true });
    return task ? TaskModel.hydrate({ ...task.toObject(), id: task._id.toString() }) : null;
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }
}
