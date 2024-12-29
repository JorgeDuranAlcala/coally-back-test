import { CreateTaskDto } from "../dto/createTaskDto"
import { TaskModel } from "../models/task-model"

export interface ITaskService {
  createTask(taskData: CreateTaskDto): Promise<TaskModel> 
  getTaskById(id: string): Promise<TaskModel> 
  getAllTasks(filters?: {userId?: string, completed?: boolean}): Promise<TaskModel[]> 
  updateTask(id: string, taskData: Partial<CreateTaskDto>): Promise<TaskModel> 
  deleteTask(id: string): Promise<TaskModel> 
}