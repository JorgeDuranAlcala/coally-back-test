import { CreateUserDto } from "@src/domain/User/dtos/create-dto";
import { ReturnUserDto } from "@src/domain/User/dtos/returnUser-dto";

export interface IUserService {
  create(createUserDto: CreateUserDto): Promise<ReturnUserDto>;
  getAll(): Promise<ReturnUserDto[]>;
}
