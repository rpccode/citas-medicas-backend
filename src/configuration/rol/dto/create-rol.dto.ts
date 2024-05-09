import { IsNotEmpty, IsString } from "class-validator";

export class CreateRolDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;
  
    @IsString()
    @IsNotEmpty()
    descripcion: string;
}
