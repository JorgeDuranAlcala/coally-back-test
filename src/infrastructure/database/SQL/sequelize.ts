import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
// sequelize initialization

export const sequelize = new Sequelize(
  process.env.DB_DATABASE ?? "testing_ali_fullstack",
  process.env.DB_USER ?? "testing",
  process.env.DB_PASSWORD ?? "Pruebas%ALI%2020",
  {
    host:
      process.env.DB_HOST ??
      "data-avimo.cgriqmyweq5c.us-east-2.rds.amazonaws.com",
    dialect: "mysql",
  }
);
