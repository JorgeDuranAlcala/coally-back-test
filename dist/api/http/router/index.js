"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const router_1 = require("./router");
const user_controller_1 = require("../controllers/user-controller");
const auth_middleware_1 = require("../middlewares/auth-middleware");
const task_controller_1 = require("../controllers/task-controller");
const authMiddleware = new auth_middleware_1.AuthMiddleware();
// router
const router = router_1.HTTPRouter.create(user_controller_1.userController, authMiddleware, task_controller_1.taskController);
exports.router = router;
