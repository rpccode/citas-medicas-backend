import { IsString, IsNotEmpty } from "class-validator";
import { Column } from "typeorm";

export class CreateSpecialtyDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    descripcion: string;

}
