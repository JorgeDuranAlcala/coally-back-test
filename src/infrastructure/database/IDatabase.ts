import { Collection } from "@src/infrastructure/database/SQL";
import { User } from "@src/domain/User";
import { UserModel } from "./models/user";
import { UserProps } from "@src/domain/User/user-props";

export interface IDatabase {
  users: any;
}
