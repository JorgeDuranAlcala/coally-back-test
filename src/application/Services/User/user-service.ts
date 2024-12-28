import { CreateUserDto } from "@src/domain/User/dtos/create-dto";
import { IUserService } from "./IUserService";
import { UserRepository } from "@src/infrastructure/userRepository/IUserRepo";
import { ReturnUserDto } from "@src/domain/User/dtos/returnUser-dto";
import { CreateUser } from "./Use-cases/CreateUser";
import { GetAllUser } from "./Use-cases/GetAllUsers";

export class UserService implements IUserService {
  private readonly _userRepo: UserRepository;

  constructor(_userRepo: UserRepository) {
    this._userRepo = _userRepo;
  }

  static create(_userRepo: UserRepository) {
    return new UserService(_userRepo);
  }

  async create(createUserDto: CreateUserDto): Promise<ReturnUserDto> {
    return await CreateUser.create(this._userRepo).exec(createUserDto);
  }

  async getAll(): Promise<ReturnUserDto[]> {
    return await GetAllUser.create(this._userRepo).exec();
  }
}
