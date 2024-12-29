import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { IAuthMiddleware } from "src/domain/middlewares/auth-middleware.interface";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      userId: string;
    };
  }
}

export class AuthMiddleware implements IAuthMiddleware {

    public validateToken(req: Request, res: Response, next: NextFunction): void {
      try {
        const token = req.headers["authorization"]?.split(" ")[1];
        if (!token) {
          res.status(401).json({ message: "Token not found" });
        }
        const decoded = jwt.verify(String(token), String(process.env.JWT_SECRET))
        const userId = (decoded as {
          id: string;
        })?.id
        req.user = { userId };
        next();
      } catch (err) {
        next(err);
      }

    }
    
}