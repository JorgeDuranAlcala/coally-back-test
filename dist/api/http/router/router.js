"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPRouter = void 0;
const express_1 = require("express");
class HTTPRouter {
    constructor(_user_controller, _auth_middleware, _task_controller) {
        this._router = (0, express_1.Router)();
        this._user_controller = _user_controller;
        this._auth_middleware = _auth_middleware;
        this._task_controller = _task_controller;
    }
    static create(_user_controller, _auth_middleware, _task_controller) {
        const instance = new HTTPRouter(_user_controller, _auth_middleware, _task_controller);
        return instance;
    }
    get() {
        this._router.post('/register', this._user_controller.create);
        this._router.post("/login/", this._user_controller.login);
        this._router.delete('/users/:id', this._user_controller.delete);
        this._router.get("/hello", this._auth_middleware.validateToken, (req, res) => {
            var _a;
            res.send("Hello World " + ((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId));
        });
        this._router.get("/tasks", this._auth_middleware.validateToken, this._task_controller.getAll);
        this._router.get("/tasks/:id", this._auth_middleware.validateToken, this._task_controller.getById);
        this._router.post("/tasks", this._auth_middleware.validateToken, this._task_controller.create);
        this._router.put("/tasks/:id", this._auth_middleware.validateToken, this._task_controller.update);
        this._router.delete("/tasks/:id", this._auth_middleware.validateToken, this._task_controller.delete);
        return this._router;
    }
}
exports.HTTPRouter = HTTPRouter;
