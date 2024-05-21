import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { Autor } from './entities/autor.entity';
import { AutoresService } from './autores.service';
import { ApiOperation } from '@nestjs/swagger';

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
    create(@Body() autor: Autor) : Promise<Autor>{
        return this.autoresService.createAutor(autor)
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar un autor existentes' })
    update(@Param('id') id: number, @Body() autor: Autor) : Promise<Autor>{
        return this.autoresService.updateAutor(id,autor)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un autor existentes' })
    delete(@Param('id') id:number) : Promise<void>{
        return this.autoresService.removeAutor(id)
    }
}
