import { HTTPRouter } from "./router";
import { userController } from "../controllers/user-controller";
import { AuthMiddleware } from "../middlewares/auth-middleware";
import { taskController } from "../controllers/task-controller";

const authMiddleware = new AuthMiddleware();
// router
const router = HTTPRouter.create(userController, authMiddleware, taskController );

export { router };
