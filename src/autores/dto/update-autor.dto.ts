import { IsOptional, IsString } from 'class-validator';

export class UpdateAutorDto {
    @IsOptional()
    @IsString()
    nombre?: string;
  
    @IsOptional()
    @IsString()
    apellido?: string;
  
    @IsOptional()
    @IsString()
    dni?: string;
  }