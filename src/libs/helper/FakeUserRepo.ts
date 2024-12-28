import { User } from "@src/domain/User";
import { UserProps } from "@src/domain/User/user-props";
import { UserRepository } from "@src/infrastructure/userRepository/IUserRepo";

const _fakedb: User[] = [];

export class FakeUserRepo implements UserRepository {
  create = jest.fn().mockImplementation((userProps: UserProps) => {
    const newUser = User.create(userProps);
    _fakedb.push(newUser);
    return Promise.resolve(newUser);
  });

  findAll = jest.fn().mockImplementation(() => {
    const users = [..._fakedb];
    return Promise.resolve(users);
  });
}
