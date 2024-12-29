import { CreateUserDto } from '@src/domain/dto/createUserDto';
import { IUserRepository } from '@src/domain/infrastructure/user.repository';
import { UserModel } from '@src/domain/models/user.model';
import { IUser } from '@src/domain/types/user.interface';

export class InMemoryUserRepository implements IUserRepository {
  private users: Map<string, IUser> = new Map();
  private currentId = 1;

  async create(user: IUser): Promise<UserModel> {
    const id = this.currentId.toString();
    this.currentId++;
    const newUser = { ...user, id };
    this.users.set(id, newUser);
    return UserModel.hydrate(newUser);
  }

  async findById(id: string): Promise<UserModel | null> {
    const user = this.users.get(id);
    return user ? UserModel.hydrate(user) : null;
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    const user = Array.from(this.users.values()).find(u => u.email === email);
    return user ? UserModel.hydrate(user) : null;
  }

  async findAll(): Promise<UserModel[]> {
    return Array.from(this.users.values()).map(user => UserModel.hydrate(user));
  }

  async update(id: string, userData: Partial<CreateUserDto>): Promise<UserModel | null> {
    const existingUser = this.users.get(id);
    if (!existingUser) return null;
    
    const updatedUser = { ...existingUser, ...userData };
    this.users.set(id, updatedUser);
    return UserModel.hydrate(updatedUser);
  }

  async delete(id: string): Promise<void> {
    this.users.delete(id);
  }
}
