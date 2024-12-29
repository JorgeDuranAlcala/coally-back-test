import { IRouter, Router } from "express";
import { IHTTPRouter } from "./IRouter";
import { IUserController } from "../controllers/user-controller/IUserController";
import { AuthMiddleware } from "../middlewares/auth-middleware";
import { IAuthMiddleware } from "@src/domain/middlewares/auth-middleware.interface";
import { ITaskController } from "../controllers/task-controller/ITaskController";

export class HTTPRouter implements IHTTPRouter {
  private readonly _router;
  private readonly _user_controller: IUserController;
  private readonly _auth_middleware: IAuthMiddleware;
  private readonly _task_controller: ITaskController;

  private constructor(
    _user_controller: IUserController, 
    _auth_middleware: IAuthMiddleware,
    _task_controller: ITaskController
  ) {
    this._router = Router();
    this._user_controller = _user_controller;
    this._auth_middleware = _auth_middleware;
    this._task_controller = _task_controller;
  }

  static create(
    _user_controller: IUserController,
    _auth_middleware: IAuthMiddleware,
    _task_controller: ITaskController
  ) {
    const instance = new HTTPRouter(
      _user_controller,
      _auth_middleware,
      _task_controller
    );
    return instance;
  }

  get(): IRouter {
    this._router.post('/register', this._user_controller.create)
    this._router.post("/login/", this._user_controller.login);
    this._router.delete('/users/:id', this._user_controller.delete);
    this._router.get("/hello", this._auth_middleware.validateToken , (req, res) => {
      res.send("Hello World " + req.user?.userId);
    });
    this._router.get("/tasks", this._auth_middleware.validateToken, this._task_controller.getAll);
    this._router.get("/tasks/:id", this._auth_middleware.validateToken, this._task_controller.getById);
    this._router.post("/tasks", this._auth_middleware.validateToken, this._task_controller.create);
    this._router.put("/tasks/:id", this._auth_middleware.validateToken, this._task_controller.update);
    this._router.delete("/tasks/:id", this._auth_middleware.validateToken, this._task_controller.delete);

    return this._router;
  }
}
