import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { Editorial } from './entities/editorial.entity';
import { EditorialesService } from './editoriales.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('editoriales')
export class EditorialesController {
    constructor(
        private readonly editorialesService: EditorialesService
    ) { }

    @Get()
    @ApiOperation({ summary: 'Mostrar todas las editoriales' })
    findAll():Promise<Editorial[]>{
        return this.editorialesService.findAll()
    }
    @Get(':id')
    @ApiOperation({ summary: 'Mostrar una editorial existente' })
    findOne(@Param('id') id: number) : Promise<Editorial>{
        return this.editorialesService.findOne(id)
    }

    @Post()
    @ApiOperation({ summary: 'Crear una nueva editorial' })
    create(@Body() editorial: Editorial) : Promise<Editorial>{
        return this.editorialesService.createEditorial(editorial)
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar una editorial existente' })
    update(@Param('id') id: number, @Body() editorial: Editorial) : Promise<Editorial>{
        return this.editorialesService.updateEditorial(id,editorial)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar una editorial existente' })
    delete(@Param('id') id:number) : Promise<void>{
        return this.editorialesService.removeEditorial(id)
    }
}