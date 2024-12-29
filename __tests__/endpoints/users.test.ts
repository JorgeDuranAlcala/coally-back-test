import supertest from "supertest";
import { ErrorHandler } from "../../src/api/http/middlewares/error-handler";
import { router } from "../../src/api/http/router";
import { ExpressApp } from "../../src/api/http/server";
import { HTTP_STATUS_CODE } from "../../src/constants/http";
process.env.NODE_ENV = "test";
describe("users controller endpoints", () => {
  let request: supertest.SuperTest<supertest.Test>;
  let base_url: string;

  beforeAll(async () => {
    const app = ExpressApp.create(router, new ErrorHandler()).app;
    request = supertest(app);
    const api_version = app.get("api-version");
    base_url = `/api/v${api_version}`;
  });

  describe("/POST /register", () => {

    test("should register a user", async () => {
      const body = {
        name: "Jorge",
        email: "jorgeluis23.duran@gmail.com",
        password: "Luna$202"
      }
      const res = await request.post(`${base_url}/register`).send(body);
      expect(res.statusCode).toEqual(HTTP_STATUS_CODE.OK);
      expect(res.body).toBeDefined();
      expect(res.body.user.name).toEqual(body.name);
    });

    test("should throw an Error when wrong body is passed", async () => {
      const body = {
        email: "jorgeluis20.duran@gmail.com",
        password: "Luna$202"
      }
      const res = await request.post(`${base_url}/register`).send(body);
      expect(res.statusCode).toEqual(HTTP_STATUS_CODE.MALFORMED_DATA);
    });

  });

  describe("/POST /login", () => {

    test("should login a user", async () => {
      const body = {
        email: "jorgeluis23.duran@gmail.com",
        password: "Luna$202"
      }
      const res = await request.post(`${base_url}/login`).send(body);
      expect(res.statusCode).toEqual(HTTP_STATUS_CODE.OK);
      expect(res.body).toBeDefined();
      expect(res.body.token).toBeDefined();
    });

    test("should throw an Error when wrong body is passed", async () => {
      const body = {
        email: "jorgeluis20.duran@gmail.com",
      }
      const res = await request.post(`${base_url}/login`).send(body);
      expect(res.statusCode).toEqual(HTTP_STATUS_CODE.MALFORMED_DATA);
    });

  });
});