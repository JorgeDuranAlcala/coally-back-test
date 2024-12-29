import { CreateUserDto } from "../dto/createUserDto";
import { UserModel } from "../models/user.model";

export interface IUserRepository {
    create(user: CreateUserDto): Promise<UserModel>;
    findById(id: string): Promise<UserModel | null>;
    findByEmail(email: string): Promise<UserModel | null>;
    findAll(): Promise<UserModel[]>;
    update(id: string, user: Partial<CreateUserDto>): Promise<UserModel | null>;
    delete(id: string): Promise<void>;
  }