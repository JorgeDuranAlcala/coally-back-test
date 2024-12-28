export type UserRoles = "user" | "admin";

export interface UserProps {
  id?: string;
  nombre: string;
  segundo_nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  fecha_de_nacimiento: string;
  email: string;
  telefono: string;
}
