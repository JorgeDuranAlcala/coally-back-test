import { CreateUserDto } from "../dto/createUserDto";
import { UserModel } from "../models/user.model";

export interface IUserService {
  createUser(userData: CreateUserDto): Promise<UserModel>;
  getUserById(id: string): Promise<UserModel>;
  login(email: string, password: string): Promise<UserModel>;
  getAllUsers(): Promise<UserModel[]>;
  updateUser(id: string, userData: Partial<CreateUserDto>): Promise<UserModel>;
  deleteUser(id: string): Promise<void>;
}
