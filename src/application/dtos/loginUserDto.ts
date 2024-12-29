import { Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  @Expose()
  @IsEmail()
  email!: string;

  @Expose()
  @IsString()
  password!: string;
}
