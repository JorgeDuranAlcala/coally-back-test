import { IUDgenerator } from "@src/libs/UIDgenerator/IUIDgenerator";
import { UIDgenerator } from "@src/libs/UIDgenerator/uid-generator";
import { Entity } from "../Entity";
import { UserProps } from "./user-props";

const IDgenerator: IUDgenerator = UIDgenerator.create();

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: string) {
    super({ ...props }, !id ? IDgenerator.gen() : id);
  }

  static create({ id, ...props }: UserProps): User {
    const instance = new User({ ...props }, id);
    return instance;
  }

  public get id(): string {
    return this._id;
  }

  public get nombre(): string {
    return this.props.nombre;
  }

  public get segundo_nombre(): string {
    return this.props.segundo_nombre;
  }

  public get apellido_paterno(): string {
    return this.props.apellido_paterno;
  }

  public get apellido_materno(): string {
    return this.props.apellido_materno;
  }

  public get fecha_de_nacimiento(): string {
    return this.props.fecha_de_nacimiento;
  }

  public get email(): string {
    return this.props.email;
  }

  public get telefono(): string {
    return this.props.telefono;
  }

  public getProps(): UserProps {
    return this.props;
  }
}
