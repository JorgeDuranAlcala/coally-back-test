import { Expose } from "class-transformer";
import { IsBoolean, IsString } from "class-validator";

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