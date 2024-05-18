import { Controller, Get, Post, Body, Param, Put, Delete, BadRequestException, NotFoundException, Query } from '@nestjs/common';
import { LibrosService } from './libros.service';
import { Libro } from './entities/libro.entity';

@Controller('libros')
export class LibrosController {
    constructor(
        private readonly libroService: LibrosService
    ) { }

    @Get()
  findAll(
    @Query('filter') filter?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ): Promise<Libro[]> {
    return this.libroService.findAll(filter, page, limit);
  }
    @Get(':id')
    findOne(@Param('id') id: number) : Promise<Libro>{
        return this.libroService.findOne(id)
    }

    @Post()
    async create(@Body() libro: Libro): Promise<Libro> {
        try {
            return await this.libroService.createLibro(libro);
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error;
            }
            throw new BadRequestException('Error al crear el libro');
        }
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() libro: Libro) : Promise<Libro>{
        return this.libroService.updateLibro(id,libro)
    }

    @Delete(':id')
    delete(@Param('id') id:number) : Promise<void>{
        return this.libroService.removeLibro(id)
    }
}
