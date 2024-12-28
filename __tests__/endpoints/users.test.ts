import supertest from "supertest";
import { ErrorHandler } from "../../src/api/http/middlewares/error-handler";
import { router } from "../../src/api/http/router";
import { ExpressApp } from "../../src/api/http/server";
import { HTTP_STATUS_CODE } from "../../src/constants/http";

describe("users endpoints", () => {
  let request: supertest.SuperTest<supertest.Test>;
  let base_url: string;

  beforeAll(async () => {
    const app = ExpressApp.create(router, new ErrorHandler()).app;
    request = supertest(app);
    const api_version = app.get("api-version");
    base_url = `/api/v${api_version}`;
  });

  describe("/POST /users", () => {

    test("should create a user", async () => {
			const body = {
				nombre: "Jorge",
				segundo_nombre: "Luis",
				apellido_paterno: "Duran",
				apellido_materno: "Alcala",
				fecha_de_nacimiento: "20 junio 2001",
				email: "jorgeluis20.duran@gmail.com",
				telefono: "+584267472629",
			}
      const res = await request.post(`${base_url}/users`).send(body);
      expect(res.statusCode).toEqual(HTTP_STATUS_CODE.OK);
      expect(res.body).toBeDefined();
      expect(res.body.user.nombre).toEqual(body.nombre);
    });

    test("should throw an Error when wrong body is passed", async () => {
			const body = {
				nombre: "Jorge",
				segundo_nombre: "Luis",
				apellido_paterno: "Duran",
				apellido_materno: "Alcala",
				fecha_de_nacimiento: "20 junio 2001",
				email: "jorgeluis20.duran@gmail.com",
			}
      const res = await request.post(`${base_url}/users`).send(body);
      expect(res.statusCode).toEqual(HTTP_STATUS_CODE.MALFORMED_DATA);
    });

  });
});
