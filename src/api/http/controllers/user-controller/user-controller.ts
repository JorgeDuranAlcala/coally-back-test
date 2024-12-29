import { IValidator } from "src/libs/Validator/IValidator";
import { BaseController } from "../base-controller";
import { IUserController } from "./IUserController";
import { NextFunction, Request, Response } from "express";
import { IUserService } from "src/domain/application/user.service.interface";
import { CreateUserDto } from "src/application/dtos/createUserDto";
import { LoginUserDto } from "src/application/dtos/loginUserDto";


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The user's name.
 *           example: Jorge
 *         email:
 *           type: string
 *           description: The user's email.
 *           example: jorgeluis23.duran@gmail.com
 *         password:
 *           type: string
 *           description: The user's password.
 *           example: Luna$202
 */

/**
 * @swagger
 * /api/v1/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       422:
 *         description: MALFORMED DATA
 */

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: jorgeluis23.duran@gmail.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: Luna$202
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The user's authentication token.
 *       422:
 *         description: MALFORMED DATA
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The task's title.
 *           example: Complete the project
 *         description:
 *           type: string
 *           description: The task's description.
 *           example: Finish the project by the end of the month
 *         completed:
 *           type: boolean
 *           description: The task's completion status.
 *           example: false
 *         userId:
 *           type: string
 *           description: The ID of the user who created the task.
 *           example: some-user-id
 */

/**
 * @swagger
 * /api/v1/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 task:
 *                   $ref: '#/components/schemas/Task'
 *       422:
 *         description: MALFORMED DATA
 */

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
*     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: The ID of the user to filter tasks by
 *       - in: query
 *         name: completed
 *         schema:
 *           type: boolean
 *         description: Filter tasks by completion status
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       404:
 *         description: NOT FOUND
 */

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: NOT FOUND
 */

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   put:
 *     summary: Update a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: NOT FOUND
 */

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: NOT FOUND
 */

export class UserController extends BaseController implements IUserController {
  private readonly _userService: IUserService;
  private readonly _validator: IValidator;

  constructor(userService: IUserService, _validator: IValidator) {
    super();
    this._userService = userService;
    this._validator = _validator;
  }

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
      const user = await this._userService.createUser(createUserDto);
      const userData = this.transformToPlainObj(user.toJSON());
      return this.ok(res, { user: userData });
    } catch (error) {
      if (!(error instanceof Error)) return;
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const loginUserDto = this.bodyParser(LoginUserDto, req.body);
      await this._validator.validate(loginUserDto);
      const user = await this._userService.login(loginUserDto.email, loginUserDto.password);
      return this.ok(res, {
        ...this.transformToPlainObj(user.toJSON()),
        token: user.generateToken(),
      });      
    } catch (error) {
      if (!(error instanceof Error)) return;
      next(error);
    }

  }
  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this._userService.deleteUser(req.params.id);
      return this.ok(res, {
        deleted: true
      });
    } catch (error) {
      if (!(error instanceof Error)) return;
      next(error);
    }
  }
}
