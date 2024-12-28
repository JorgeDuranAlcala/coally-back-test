import { User } from "@src/domain/User";
import { UserProps } from "@src/domain/User/user-props";
import { InMemoryDatabase } from "../database/In-memory";
import { UserRepository } from "./IUserRepo";
import { IDatabase } from "@src/infrastructure/database/IDatabase";

export class InMemoryUserRepo implements UserRepository {
  constructor(private readonly _database: IDatabase) {
    this._database = _database;
  }

  async create(props: UserProps): Promise<User> {
    const user = User.create(props);
    const users = await this._database.users.insert(user);
    return users;
  }

  async findAll(): Promise<User[]> {
    const users = await this._database.users.findAll();
    return users;
  }
}
