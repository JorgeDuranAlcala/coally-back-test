import { Expose } from 'class-transformer';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateTaskDto {
  @Expose()
  @IsString()
  @IsOptional()
  title?: string;

  @Expose()
  @IsString()
  @IsOptional() 
  description?: string;

  @Expose()
  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}