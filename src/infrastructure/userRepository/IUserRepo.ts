import { User } from "@src/domain/User";
import { UserProps } from "@src/domain/User/user-props";

export interface UserRepository {
  create(props: UserProps): Promise<User>;
  findAll(): Promise<User[]>;
}
