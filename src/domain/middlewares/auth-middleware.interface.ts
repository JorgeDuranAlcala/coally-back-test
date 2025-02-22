import { NextFunction, Request, Response } from "express";

export interface IAuthMiddleware {
  validateToken: (req: Request, res: Response, next: NextFunction) => void;
}