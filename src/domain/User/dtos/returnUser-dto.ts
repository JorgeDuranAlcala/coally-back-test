import { Exclude, Expose } from "class-transformer";

export interface IReturnUserDto {
  nombre: string;
  segundo_nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  fecha_de_nacimiento: string;
  email: string;
  telefono: string;
}

@Exclude()
export class ReturnUserDto implements IReturnUserDto {
  @Expose()
  public nombre: string;

  @Expose()
  public segundo_nombre: string;

  @Expose()
  public apellido_paterno: string;

  @Expose()
  public apellido_materno: string;

  @Expose()
  public fecha_de_nacimiento: string;

  @Expose()
  public email: string;

  @Expose()
  public telefono: string;

  static create({
    nombre,
    segundo_nombre,
    apellido_paterno,
    apellido_materno,
    fecha_de_nacimiento,
    email,
    telefono,
  }: IReturnUserDto) {
    return new ReturnUserDto(
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
