import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateServiceDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;
  
    @IsString()
    @IsNotEmpty()
    descripcion: string;
  
    @IsNumber()
    @IsNotEmpty()
    costo: number;
  
    @IsString()
    @IsNotEmpty()
    duracionEstimada: string;
}
