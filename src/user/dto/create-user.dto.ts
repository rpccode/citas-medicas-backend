import { IsString, IsNotEmpty,IsEmail } from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    nombre: string;
      
    
    @IsString()
@IsEmail()
      correo: string;
    
      @IsString()
    @IsNotEmpty()
      clave: string;
    
    
}
