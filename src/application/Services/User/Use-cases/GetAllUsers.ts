import { UserRepository } from "@src/infrastructure/userRepository/IUserRepo";
import { ReturnUserDto } from "@src/domain/User/dtos/returnUser-dto";

export class GetAllUser {
  private readonly _userRepo: UserRepository;

  static create(_userRepo: UserRepository) {
    return new GetAllUser(_userRepo);
  }

  private constructor(_userRepo: UserRepository) {
    this._userRepo = _userRepo;
  }

  async exec() {
    const users = await this._userRepo.findAll();
    return [...users].map((user) => ReturnUserDto.create(user.getProps()));
  }
}
