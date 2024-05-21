import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { Editorial } from './entities/editorial.entity';
import { EditorialesService } from './editoriales.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateEditorialDto } from './dto/create-editorial.dto';
import { UpdateEditorialDto } from './dto/update-editorial.dto';

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
    @ApiResponse({ status: 201, description: 'La editorial ha sido creada con éxito.', type: Editorial })
    @ApiResponse({ status: 400, description: 'Datos de entrada incorrectos.' })
    async create(@Body() createEditorialDto: CreateEditorialDto): Promise<Editorial> {
      return this.editorialesService.createEditorial(createEditorialDto);
    }
  
    @Put(':id')
    @ApiOperation({ summary: 'Actualizar una editorial existente' })
    @ApiResponse({ status: 200, description: 'La editorial ha sido actualizada con éxito.', type: Editorial })
    @ApiResponse({ status: 404, description: 'La editorial con el ID especificado no existe.' })
    @ApiResponse({ status: 400, description: 'Datos de entrada incorrectos.' })
    async update(@Param('id') id: number, @Body() updateEditorialDto: UpdateEditorialDto): Promise<Editorial> {
      return this.editorialesService.updateEditorial(id, updateEditorialDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar una editorial existente' })
    delete(@Param('id') id:number) : Promise<void>{
        return this.editorialesService.removeEditorial(id)
    }
}