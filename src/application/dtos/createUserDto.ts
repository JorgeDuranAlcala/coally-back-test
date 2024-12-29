import { Expose } from 'class-transformer';
import { IsBoolean, IsEmail, IsString, MinLength, Validate } from 'class-validator';
import { IsPasswordStrong } from 'src/libs/Validator/pass-is-strong';

export class CreateUserDto {
  @Expose()
  @IsString()
  @MinLength(2)
  name!: string;

  @Expose()
  @IsEmail()
  email!: string;

  @Expose()
  @IsString()
  @Validate(IsPasswordStrong)
  password!: string;
}

export class CreateTaskDto {
  @Expose()
  @IsString()
  title!: string;

  @Expose()
  @IsString()
  description!: string;

    @Expose()
    @IsString()
    userId!: string;

    @Expose()
    @IsBoolean()
    completed!: boolean;
}