import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateScheduleDto {
  
    @IsDateString()
    @IsNotEmpty()
    fechaAtencion: Date;
  
    @IsString()
    @IsNotEmpty()
    inicioAtencion: string;
  
    @IsString()
    @IsNotEmpty()
    finAtencion: string;
  
    @IsString()
    @IsNotEmpty()
    usuarioRegistro: string;
  
   
}
