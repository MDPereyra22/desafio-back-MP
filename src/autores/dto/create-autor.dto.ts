import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAutorDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  apellido: string;

  @IsNotEmpty()
  @IsString()
  dni: string;
}