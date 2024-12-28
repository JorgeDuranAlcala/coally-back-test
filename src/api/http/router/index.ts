import { HTTPRouter } from "./router";
import { userController } from "../controllers/user-controller";

const router = HTTPRouter.create(userController);

export { router };
