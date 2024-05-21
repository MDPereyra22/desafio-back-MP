import { Controller, Get, Post, Body, Param, Put, Delete, BadRequestException, NotFoundException, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { LibrosService } from './libros.service';
import { Libro } from './entities/libro.entity';
import { ApiHideProperty, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';

@Controller('libros')
export class LibrosController {
    constructor(
        private readonly libroService: LibrosService
    ) { }

    @Get()
    @ApiOperation({ summary: 'Mostrar todos los libros existentes' })
    @ApiQuery({name:'filter', required: false, type: String})
    @ApiQuery({name:'page', required: false, type: Number})
    @ApiQuery({name:'limit', required: false, type: Number})
  findAll(
    @Query('filter') filter?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ): Promise<Libro[]> {
    return this.libroService.findAll(filter, page, limit);
  }
    @Get(':id')    
    @ApiOperation({ summary: 'Mostrar un libro existente' })
    findOne(@Param('id') id: number) : Promise<Libro>{
        return this.libroService.findOne(id)
    }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo libro' })
    @ApiResponse({ status: 201, description: 'El libro ha sido creado con éxito.', type: Libro })
    @ApiResponse({ status: 400, description: 'Datos de entrada incorrectos.' })
    async create(@Body() createLibroDto: CreateLibroDto): Promise<Libro> {
      return this.libroService.createLibro(createLibroDto);
    }
  

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar un libro existente' })
    @ApiResponse({ status: 200, description: 'El libro ha sido actualizado con éxito.', type: Libro })
    @ApiResponse({ status: 404, description: 'El libro con el ID especificado no existe.' })
    @ApiResponse({ status: 400, description: 'Datos de entrada incorrectos.' })
    async update(@Param('id') id: number, @Body() updateLibroDto: UpdateLibroDto): Promise<Libro> {
      return this.libroService.updateLibro(id, updateLibroDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un libro existente' })
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id') id:number) : Promise<void>{
        return this.libroService.removeLibro(id)
    }
}
