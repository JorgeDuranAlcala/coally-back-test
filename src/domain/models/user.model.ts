import { UserJson } from "../types/user-json";
import { IUser } from "../types/user.interface";
import jwt from 'jsonwebtoken';

export class UserModel {
    private readonly _id: string;
    private readonly _name: string;
    private readonly _email: string;
    private readonly _password: string;
    private readonly _createdAt: Date;
    private readonly _updatedAt: Date;

    constructor(
      id: string,
      name: string,
      email: string,
      password: string,
      createdAt: Date,
      updatedAt: Date
    ) {
      this._id = id;
      this._name = name;
      this._email = email;
      this._password = password;
      this._createdAt = createdAt;
      this._updatedAt = updatedAt;
    }

    toJSON(): UserJson {
        return {
            id: this._id,
            name: this._name,
            email: this._email,
            password: this._password,
            createdAt: this._createdAt,
            updatedAt: this._updatedAt
        }
    }

    generateToken() {
        // Generate token
        const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET as string, {
            expiresIn: '3h'
        });
        return token;
    }

    static hydrate(data: IUser) {
        return new UserModel(
            String(data.id),
            data.name,
            data.email,
            data.password,
            data.createdAt,
            data.updatedAt
        );
    }
}