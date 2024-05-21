import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEditorialDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  direccion: string;

  @IsNotEmpty()
  @IsString()
  cuit: string;
}