import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { Autor } from './entities/autor.entity';
import { AutoresService } from './autores.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateAutorDto } from './dto/create-autor.dto';
import { UpdateAutorDto } from './dto/update-autor.dto';

@Controller('autores')
export class AutoresController {
    constructor(
        private readonly autoresService: AutoresService
    ) { }

    @Get()
    @ApiOperation({ summary: 'Mostrar todos los autores existentes' })
    findAll():Promise<Autor[]>{
        return this.autoresService.findAll()
    }
    @Get(':id')
    @ApiOperation({ summary: 'Mostrar un autor existentes' })
    findOne(@Param('id') id: number) : Promise<Autor>{
        return this.autoresService.findOne(id)
    }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo autor' })
    @ApiResponse({ status: 201, description: 'El autor ha sido creado con éxito.', type: Autor })
    @ApiResponse({ status: 400, description: 'Datos de entrada incorrectos.' })
    async create(@Body() createAutorDto: CreateAutorDto): Promise<Autor> {
      return this.autoresService.createAutor(createAutorDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar un autor existente' })
    @ApiResponse({ status: 200, description: 'El autor ha sido actualizado con éxito.', type: Autor })
    @ApiResponse({ status: 404, description: 'El autor con el ID especificado no existe.' })
    @ApiResponse({ status: 400, description: 'Datos de entrada incorrectos.' })
    async update(@Param('id') id: number, @Body() updateAutorDto: UpdateAutorDto): Promise<Autor> {
      return this.autoresService.updateAutor(id, updateAutorDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un autor existentes' })
    delete(@Param('id') id:number) : Promise<void>{
        return this.autoresService.removeAutor(id)
    }
}
