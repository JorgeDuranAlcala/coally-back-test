import { ClrExpressMethodReturnPromiseResVoid } from "../base-controller";

export interface IUserController {
  create: ClrExpressMethodReturnPromiseResVoid;
  login: ClrExpressMethodReturnPromiseResVoid;
  delete: ClrExpressMethodReturnPromiseResVoid;
}
