// src/libros/dto/create-libro.dto.ts
import { IsNotEmpty, IsString, IsNumber, IsArray, IsDateString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class AutorIdDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class EditorialIdDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class CreateLibroDto {
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsNotEmpty()
  @IsString()
  categoria: string;

  @IsNotEmpty()
  @IsNumber()
  precio: number;

  @IsNotEmpty()
  @IsDateString()
  fechaLanzamiento: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AutorIdDto)
  autores: AutorIdDto[];

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => EditorialIdDto)
  editorial: EditorialIdDto;
}
