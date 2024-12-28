import { BaseController } from "../base-controller";
import { IUserController } from "./IUserController";
import { CreateUserDto, ReturnUserDto } from "@src/domain/User/dtos";
import { IUserService } from "@src/application/Services/User/IUserService";
import { IValidator } from "@src/libs/Validator/IValidator";
import { NextFunction, Request, Response } from "express";

export class UserController extends BaseController implements IUserController {
  private readonly _userService: IUserService;
  private readonly _validator: IValidator;

  constructor(userService: IUserService, _validator: IValidator) {
    super();
    this._userService = userService;
    this._validator = _validator;
  }

  /**
   * @swagger
   * components:
   *   schemas:
   *     User:
   *       type: object
   *       properties:
   *         nombre:
   *           type: string
   *           description: The user's name.
   *           example: Jorge Duran
   *         segundo_nombre:
   *           type: string
   *           description: The user's middle name.
   *           example: Luis
   *         apellido_paterno:
   *           type: string
   *           description: The user's paternal last name.
   *           example: Duran
   *         apellido_materno:
   *           type: string
   *           description: The user's maternal last name.
   *           example: Alcala
   *         fecha_de_nacimiento:
   *           type: string
   *           format: date
   *           description: The user's date of birth.
   *           example: "2001-06-20"
   *         email:
   *           type: string
   *           format: email
   *           description: The user's email address.
   *           example: jorgeluis20.duran@gmail.com
   *         telefono:
   *            type: string
   *            description: the user's phone number.
   *            example: "+584267472629"
   */

  /**
   * @openapi
   * /api/vbeta/users:
   *   post:
   *     description: Create a user
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/User'
   *     responses:
   *       200:
   *          description: OK
   *          content:application/json:
   *            schema:
   *              $ref: '#/components/schemas/User'
   *       422:
   *         description: MALFORMEDATA
   *         content:application/json:
   *
   */

  create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const createUserDto = this.bodyParser(
        CreateUserDto,
        req.body as Record<string, unknown>
      );
      await this._validator.validate(createUserDto);
      const user = await this._userService.create(createUserDto);
      const userData = this.transformToPlainObj(user);
      return this.ok(res, { user: userData });
    } catch (error) {
      if (!(error instanceof Error)) return;
      next(error);
    }
  };

  getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const user = await this._userService.getAll();
      return this.ok(res, { user });
    } catch (error) {
      if (!(error instanceof Error)) return;
      next(error);
    }
  };
}
