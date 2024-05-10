import { IsNotEmpty, IsNumber, IsUUID } from "class-validator";

export class CreateUserRolDto {

    @IsUUID()
    @IsNotEmpty()
    empresaId: string;
  
    @IsUUID()
    @IsNotEmpty()
    usuarioId: string;
  
    @IsNumber()
    @IsNotEmpty()
    rolId: number;
}
