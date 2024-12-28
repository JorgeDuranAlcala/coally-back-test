import { User } from "@src/domain/User";
import { UserModel } from "./models/user";
import { UserProps } from "@src/domain/User/user-props";
import { IDatabase } from "@src/infrastructure/database/IDatabase";

export class Collection<
  T extends {
    id: string;
    updateProp: (props: Partial<Props>) => T;
    getProps: () => Props;
  },
  Props
> {
  // eslint-disable-next-line no-unused-vars
  //private updateFn: <U>(item: T, PropsToUpdate: Partial<U>) => T;

  // eslint-disable-next-line no-unused-vars
  constructor() {}

  async insert(entity: User): Promise<User> {
    const user = await (UserModel as any).create(entity.getProps());
    return User.create({ ...user.dataValues });
  }

  async findAll() {
    return await (UserModel as any).findAll();
  }
}

export class SQLDatabase {
  users: Collection<User, UserProps> = new Collection();
}
