import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export interface ICreateUserDto {
  nombre: string;
  segundo_nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  fecha_de_nacimiento: string;
  email: string;
  telefono: string;
}

@Exclude()
export class CreateUserDto implements ICreateUserDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  public nombre: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  public segundo_nombre: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  public apellido_paterno: string;
  @Expose()
  @IsNotEmpty()
  @IsString()
  public apellido_materno: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  public fecha_de_nacimiento: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  public email: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  public telefono: string;

  static create({
    nombre,
    segundo_nombre,
    apellido_paterno,
    apellido_materno,
    fecha_de_nacimiento,
    email,
    telefono,
  }: ICreateUserDto) {
    return new CreateUserDto(
      nombre,
      segundo_nombre,
      apellido_paterno,
      apellido_materno,
      fecha_de_nacimiento,
      email,
      telefono
    );
  }

  constructor(
    nombre: string,
    segundo_nombre: string,
    apellido_paterno: string,
    apellido_materno: string,
    fecha_de_nacimiento: string,
    email: string,
    telefono: string
  ) {
    this.nombre = nombre;
    this.segundo_nombre = segundo_nombre;
    this.apellido_paterno = apellido_paterno;
    this.apellido_materno = apellido_materno;
    this.fecha_de_nacimiento = fecha_de_nacimiento;
    this.email = email;
    this.telefono = telefono;
  }
}
