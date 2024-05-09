import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCompanyDto {
   
    @IsString()
    @IsNotEmpty() 
    nombreEmpresa: string;
  
    @IsString()
    @IsNotEmpty() 
    direccion: string;
  
    @IsString()
    @IsNotEmpty() 
    telefono: string;
  
    @IsString()
    @IsNotEmpty() 
    correoElectronico: string;
  
    @IsOptional()
    logotipo: Buffer;
  
    @IsString()
    @IsNotEmpty() 
    @IsOptional()
    otrosDetalles: string;
  
}
