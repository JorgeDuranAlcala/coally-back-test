import { User } from "../../database/mongo/user-model";
import { CreateUserDto } from "../../domain/dto/createUserDto";
import { IUserRepository } from "../../domain/infrastructure/user.repository";
import { UserModel } from "../../domain/models/user.model";
import { IUser } from "../../domain/types/user.interface";

export class MongoUserRepository implements IUserRepository {
  private model: typeof User;

  constructor() {
    this.model = User;
  }

  async create(user: IUser): Promise<UserModel> {
    const newUser = await this.model.create(user);
    return UserModel.hydrate({ ...newUser.toObject(), id: newUser._id.toString() });
  }

  async findById(id: string): Promise<UserModel | null> {
    const user = await this.model.findById(id);
    return user ? UserModel.hydrate({ ...user.toObject(), id: user._id.toString() }) : null;
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    const user = await this.model.findOne({ email });
    return user ? UserModel.hydrate({ ...user.toObject(), id: user._id.toString() })  : null;
  }

  async findAll(): Promise<UserModel[]> {
    const users = await this.model.find();
    return users.map(user => UserModel.hydrate({ ...user.toObject(), id: user._id.toString() }) );
  }

  async update(id: string, userData: Partial<CreateUserDto>): Promise<UserModel | null> {
    const user = await this.model.findByIdAndUpdate(id, userData, { new: true });
    return user ? UserModel.hydrate({ ...user.toObject(), id: user._id.toString() })  : null;
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }
}
