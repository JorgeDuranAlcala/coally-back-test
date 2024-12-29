"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const base_controller_1 = require("../base-controller");
const createUserDto_1 = require("../../../..//application/dtos/createUserDto");
const loginUserDto_1 = require("../../../../application/dtos/loginUserDto");
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
class UserController extends base_controller_1.BaseController {
    constructor(userService, _validator) {
        super();
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const createUserDto = this.bodyParser(createUserDto_1.CreateUserDto, req.body);
                yield this._validator.validate(createUserDto);
                const user = yield this._userService.createUser(createUserDto);
                const userData = this.transformToPlainObj(user.toJSON());
                return this.ok(res, { user: userData });
            }
            catch (error) {
                if (!(error instanceof Error))
                    return;
                next(error);
            }
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const loginUserDto = this.bodyParser(loginUserDto_1.LoginUserDto, req.body);
                yield this._validator.validate(loginUserDto);
                const user = yield this._userService.login(loginUserDto.email, loginUserDto.password);
                return this.ok(res, Object.assign(Object.assign({}, this.transformToPlainObj(user.toJSON())), { token: user.generateToken() }));
            }
            catch (error) {
                if (!(error instanceof Error))
                    return;
                next(error);
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._userService.deleteUser(req.params.id);
                return this.ok(res, {
                    deleted: true
                });
            }
            catch (error) {
                if (!(error instanceof Error))
                    return;
                next(error);
            }
        });
        this._userService = userService;
        this._validator = _validator;
    }
}
exports.UserController = UserController;
