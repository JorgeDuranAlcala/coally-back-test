import { Request, Response, NextFunction } from 'express';

export interface ITaskController {
  create(req: Request, res: Response, next: NextFunction): Promise<Response | void> 

  getAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> 

  getById(req: Request, res: Response, next: NextFunction): Promise<Response | void> 

  update(req: Request, res: Response, next: NextFunction): Promise<Response | void> 

  delete(req: Request, res: Response, next: NextFunction): Promise<Response | void>
}
