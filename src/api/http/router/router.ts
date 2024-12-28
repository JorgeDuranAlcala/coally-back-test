import { IRouter, Router } from "express";
import { IHTTPRouter } from "./IRouter";
import { IUserController } from "../controllers/user-controller/IUserController";

export class HTTPRouter implements IHTTPRouter {
  private readonly _router;
  private readonly _user_controller: IUserController;

  private constructor(_user_controller: IUserController) {
    this._router = Router();
    this._user_controller = _user_controller;
  }

  static create(_user_controller: IUserController) {
    const instance = new HTTPRouter(_user_controller);
    return instance;
  }

  get(): IRouter {
    this._router
      .route("/users/")
      .post(this._user_controller.create)
      .get(this._user_controller.getAll);

    return this._router;
  }
}
