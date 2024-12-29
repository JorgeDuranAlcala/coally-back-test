import { BaseController } from '../base-controller';
import { Request, Response, NextFunction } from 'express';
import { ITaskController } from './ITaskController';
import { ITaskService } from '../../../../domain/application/task-service.interface';
import { IValidator } from '../../../../libs/Validator/IValidator';
import { CreateTaskDto } from '../../../../application/dtos/createTaskDto';
import { UpdateTaskDto } from '../../../../application/dtos/updateTaskDto';



export class TaskController extends BaseController implements ITaskController {
  constructor(private readonly taskService: ITaskService, private readonly validator: IValidator) {
    super();
  }

  create = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const taskDto = this.bodyParser(CreateTaskDto, req.body);
      await this.validator.validate(taskDto);
      const task = await this.taskService.createTask(taskDto);
      return this.ok(res, { task: this.transformToPlainObj(task.toJSON()) });
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const completed = req.query.completed === 'true' ? true : 
                       req.query.completed === 'false' ? false : undefined;
      const userId = req.query.userId ? String(req.query.userId) : undefined;
      const tasks = await this.taskService.getAllTasks({ completed, userId: String(userId).length > 0 ? userId : undefined });
      return this.ok(res, { tasks: tasks.map(task => this.transformToPlainObj(task.toJSON())) });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const task = await this.taskService.getTaskById(req.params.id);
      return this.ok(res, { task: this.transformToPlainObj(task.toJSON()) });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const taskDto = this.bodyParser(UpdateTaskDto, req.body);
      await this.validator.validate(taskDto);
      const task = await this.taskService.updateTask(req.params.id, taskDto);
      return this.ok(res, { task: this.transformToPlainObj(task.toJSON()) });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      await this.taskService.deleteTask(req.params.id);
      return this.ok(res);
    } catch (error) {
      next(error);
    }
  };
}
