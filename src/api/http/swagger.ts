import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hello World",
      version: "1.0.0",
    },
  },
  apis: ["./src/api/http/controllers/user-controller/user-controller.ts"], // files containing annotations as above
};

const swaggerSpec = swaggerJSDoc(options);

export const swaggerDocs = (app: any, port: number) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Docs servers running at http://localhost:${port}/api-docs`);
};
