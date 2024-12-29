import { IUserService } from '@src/domain/application/user.service.interface';
import { CreateUserDto } from '@src/domain/dto/createUserDto';
import { IUserRepository } from '@src/domain/infrastructure/user.repository';
import { UserModel } from '@src/domain/models/user.model';
import { InvalidPasswordError } from '@src/libs/Error/InvalidPassword';
import { NotFoundError } from '@src/libs/Error/NotFound';
import bcrypt from 'bcrypt'

export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async createUser(userData: CreateUserDto): Promise<UserModel> {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    const password = bcrypt.hashSync(userData.password, 10);
    return this.userRepository.create({ ...userData, password });
  }

  async getUserById(id: string): Promise<UserModel> {
    const user = await this.userRepository.findById(id);
    if (!user) {
        throw NotFoundError.create('User not found');
    }
    return user;
  }

  async login(email: string, password: string): Promise<UserModel> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw NotFoundError.create('User not found');
    }
    const isValidPassword = bcrypt.compareSync(password, user.toJSON().password);
    if (!isValidPassword) {
      throw InvalidPasswordError.create('Invalid password');
    }
    return user;
  }

  async getAllUsers(): Promise<UserModel[]> {
    return this.userRepository.findAll();
  }

  async updateUser(id: string, userData: Partial<CreateUserDto>): Promise<UserModel> {
    const updatedUser = await this.userRepository.update(id, userData);
    if (!updatedUser) {
      throw new Error('User not found');
    }
    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    await this.getUserById(id); // Verify user exists
    await this.userRepository.delete(id);
  }
}
