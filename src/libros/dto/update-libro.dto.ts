import { IsNotEmpty, IsString, IsNumber, IsArray, IsDateString, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { AutorIdDto } from './create-libro.dto';
import { EditorialIdDto } from './create-libro.dto';

export class UpdateLibroDto {
    @IsOptional()
    @IsString()
    titulo?: string;

    @IsOptional()
    @IsString()
    categoria?: string;

    @IsOptional()
    @IsNumber()
    precio?: number;

    @IsOptional()
    @IsDateString()
    fechaLanzamiento?: string;

    @IsOptional()
    @IsString()
    descripcion?: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AutorIdDto)
    autores?: AutorIdDto[];

    @IsOptional()
    @ValidateNested()
    @Type(() => EditorialIdDto)
    editorial?: EditorialIdDto;

}

