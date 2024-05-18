import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { Editorial } from './entities/editorial.entity';
import { EditorialesService } from './editoriales.service';

@Controller('editoriales')
export class EditorialesController {
    constructor(
        private readonly editorialesService: EditorialesService
    ) { }

    @Get()
    findAll():Promise<Editorial[]>{
        return this.editorialesService.findAll()
    }
    @Get(':id')
    findOne(@Param('id') id: number) : Promise<Editorial>{
        return this.editorialesService.findOne(id)
    }

    @Post()
    create(@Body() editorial: Editorial) : Promise<Editorial>{
        return this.editorialesService.createEditorial(editorial)
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() editorial: Editorial) : Promise<Editorial>{
        return this.editorialesService.updateEditorial(id,editorial)
    }

    @Delete(':id')
    delete(@Param('id') id:number) : Promise<void>{
        return this.editorialesService.removeEditorial(id)
    }
}