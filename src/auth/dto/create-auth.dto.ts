import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAuthDto {
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

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  correo: string;

  @IsString()
  @IsNotEmpty()
  clave: string;
}
