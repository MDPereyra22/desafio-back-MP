import { IsOptional, IsString } from 'class-validator';

export class UpdateEditorialDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  direccion?: string;

  @IsOptional()
  @IsString()
  cuit?: string;
}