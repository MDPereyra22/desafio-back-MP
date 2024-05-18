import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { Autor } from './entities/autor.entity';
import { AutoresService } from './autores.service';

@Controller('autores')
export class AutoresController {
    constructor(
        private readonly autoresService: AutoresService
    ) { }

    @Get()
    findAll():Promise<Autor[]>{
        return this.autoresService.findAll()
    }
    @Get(':id')
    findOne(@Param('id') id: number) : Promise<Autor>{
        return this.autoresService.findOne(id)
    }

    @Post()
    create(@Body() autor: Autor) : Promise<Autor>{
        return this.autoresService.createAutor(autor)
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() autor: Autor) : Promise<Autor>{
        return this.autoresService.updateAutor(id,autor)
    }

    @Delete(':id')
    delete(@Param('id') id:number) : Promise<void>{
        return this.autoresService.remove(id)
    }
}
