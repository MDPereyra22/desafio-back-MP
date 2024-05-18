import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { LibrosService } from './libros.service';
import { Libro } from './entities/libro.entity';

@Controller('libros')
export class LibrosController {
    constructor(
        private readonly libroService: LibrosService
    ) { }

    @Get()
    findAll():Promise<Libro[]>{
        return this.libroService.findAll()
    }
    @Get(':id')
    findOne(@Param('id') id: number) : Promise<Libro>{
        return this.libroService.findOne(id)
    }

    @Post()
    create(@Body() libro: Libro) : Promise<Libro>{
        return this.libroService.createLibro(libro)
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
