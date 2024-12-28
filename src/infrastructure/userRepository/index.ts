import { InMemoryDatabase } from "../database/In-memory";
import { SQLDatabase } from "../database/SQL/";
import { InMemoryUserRepo } from "./InMemoryUserRepo";
import dotenv from "dotenv";
import { SQLuserRepo } from "@src/infrastructure/userRepository/sql_user_repo";
dotenv.config();

const _db = new InMemoryDatabase();
export const inMemoryUserRepo = new InMemoryUserRepo(_db);
export const sqlUserRepo = new SQLuserRepo(new SQLDatabase());
