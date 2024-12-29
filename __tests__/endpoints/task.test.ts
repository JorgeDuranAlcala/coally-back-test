import supertest from "supertest";
import { ErrorHandler } from "../../src/api/http/middlewares/error-handler";
import { router } from "../../src/api/http/router";
import { ExpressApp } from "../../src/api/http/server";
import { HTTP_STATUS_CODE } from "../../src/constants/http";
process.env.NODE_ENV = "test";


describe("tasks controller endpoints", () => {
  let request: supertest.SuperTest<supertest.Test>;
  let base_url: string;
  let token: string;
  let userId: string;
  let taskId: string;

  beforeAll(async () => {
    const app = ExpressApp.create(router, new ErrorHandler()).app;
    request = supertest(app);
    const api_version = app.get("api-version");
    base_url = `/api/v${api_version}`;

    // Create a user
    const userBody = {
      name: "Jorge",
      email: "jorgeluis20.duran@gmail.com",
      password: "Luna$202"
    };
    await request.post(`${base_url}/register`).send(userBody);

    // Login to get token
    const loginBody = {
      email: "jorgeluis20.duran@gmail.com",
      password: "Luna$202"
    };
    const loginRes = await request.post(`${base_url}/login`).send(loginBody);
    token = loginRes.body.token;
    userId = loginRes.body.id;
  });

  beforeEach(async () => {
    // Create a task
    const taskBody = {
      title: "Complete the project",
      description: "Finish the project by the end of the month",
      completed: false,
      userId: userId
    };
    const res = await request.post(`${base_url}/tasks`).set("Authorization", `Bearer ${token}`).send(taskBody);
    taskId = res.body.task.id;
  })

  afterEach(async () => {
    // Delete the task
    await request.delete(`${base_url}/tasks/${taskId}`).set("Authorization", `Bearer ${token}`);
  })

  afterAll(async () => {
    // Delete the user
    await request.delete(`${base_url}/users/${userId}`).set("Authorization", `Bearer ${token}`);
  });

  describe("/POST /tasks", () => {

    test("should create a task", async () => {
      const body = {
        title: "Complete the project",
        description: "Finish the project by the end of the month",
        completed: false,
        userId: userId
      };
      const res = await request.post(`${base_url}/tasks`).set("Authorization", `Bearer ${token}`).send(body);
      expect(res.statusCode).toEqual(HTTP_STATUS_CODE.OK);
      expect(res.body).toBeDefined();
      expect(res.body.task.title).toEqual(body.title);
    });

    test("should throw an Error when wrong body is passed", async () => {
      const body = {
        title: "Complete the project"
      };
      const res = await request.post(`${base_url}/tasks`).set("Authorization", `Bearer ${token}`).send(body);
      expect(res.statusCode).toEqual(HTTP_STATUS_CODE.MALFORMED_DATA);
    });

  });

  describe("/GET /tasks", () => {

    test("should get all tasks", async () => {
      const res = await request.get(`${base_url}/tasks`).set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toEqual(HTTP_STATUS_CODE.OK);
      expect(res.body).toBeDefined();
      expect(Array.isArray(res.body.tasks)).toBe(true);
    });

    test("should get all tasks not completed", async () => {
        const completed = false;
        const res = await request.get(`${base_url}/tasks?completed=${completed}`).set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toEqual(HTTP_STATUS_CODE.OK);
        expect(res.body).toBeDefined();
        expect(Array.isArray(res.body.tasks[0].completed)).toBe(false);
      });

  });

  describe("/GET /tasks/:id", () => {

    test("should get a task by ID", async () => {
      const res = await request.get(`${base_url}/tasks/${taskId}`).set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toEqual(HTTP_STATUS_CODE.OK);
      expect(res.body).toBeDefined();
      expect(res.body.task).toBeDefined();
    });

    test("should return 404 when task is not found", async () => {
      const taskId = "non-existing-task-id";
      const res = await request.get(`${base_url}/tasks/${taskId}`).set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toEqual(HTTP_STATUS_CODE.NOT_FOUND);
    });

  });

  describe("/PUT /tasks/:id", () => {

    test("should update a task by ID", async () => {
      const body = {
        title: "Updated title",
        description: "Updated description",
        completed: true
      };
      const res = await request.put(`${base_url}/tasks/${taskId}`).set("Authorization", `Bearer ${token}`).send(body);
      expect(res.statusCode).toEqual(HTTP_STATUS_CODE.OK);
      expect(res.body).toBeDefined();
      expect(res.body.task.title).toEqual(body.title);
    });

    test("should return 404 when task is not found", async () => {
      const taskId = "non-existing-task-id";
      const body = {
        title: "Updated title",
        description: "Updated description",
        completed: true
      };
      const res = await request.put(`${base_url}/tasks/${taskId}`).set("Authorization", `Bearer ${token}`).send(body);
      expect(res.statusCode).toEqual(HTTP_STATUS_CODE.NOT_FOUND);
    });

  });

  describe("/DELETE /tasks/:id", () => {

    test("should delete a task by ID", async () => {
      const res = await request.delete(`${base_url}/tasks/${taskId}`).set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toEqual(HTTP_STATUS_CODE.OK);
    });

    test("should return 404 when task is not found", async () => {
      const taskId = "non-existing-task-id";
      const res = await request.delete(`${base_url}/tasks/${taskId}`).set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toEqual(HTTP_STATUS_CODE.NOT_FOUND);
    });

  });
});