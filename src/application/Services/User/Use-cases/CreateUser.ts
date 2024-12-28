import { UserRepository } from "@src/infrastructure/userRepository/IUserRepo";
import { CreateUserDto } from "@src/domain/User/dtos/create-dto";
import { ReturnUserDto } from "@src/domain/User/dtos/returnUser-dto";

export class CreateUser {
  private readonly _userRepo: UserRepository;

  static create(_userRepo: UserRepository) {
    return new CreateUser(_userRepo);
  }

  private constructor(_userRepo: UserRepository) {
    this._userRepo = _userRepo;
  }

  async exec(createUserDto: CreateUserDto) {
    const user = await this._userRepo.create(createUserDto);
    return ReturnUserDto.create(user.getProps());
  }
}
