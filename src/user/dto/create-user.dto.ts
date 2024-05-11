import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsUUID,
  IsNumber,
} from 'class-validator';

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

  @IsUUID()
  @IsNotEmpty()
  empresa: string;

  @IsNumber()
  @IsNotEmpty()
  rolId: number;
}
