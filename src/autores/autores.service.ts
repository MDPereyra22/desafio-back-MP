import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Autor } from 'src/autores/entities/autor.entity';
import { Repository } from 'typeorm';




@Injectable()
export class AutoresService {
    constructor(
        @InjectRepository(Autor)
        private autoresRepository: Repository<Autor>,
    ) {}

    findAll() : Promise<Autor[]>{
        return this.autoresRepository.find()
    }

    findOne(id: number) : Promise<Autor>{
        return this.autoresRepository.findOne({where:{id}});
    }

    createAutor(autor: Autor) : Promise<Autor>{
        return this.autoresRepository.save(autor)
    }

    async updateAutor(id: number, autorData: Partial<Autor>) : Promise<Autor>{
        const autor = await this.autoresRepository.findOne( {where: {id}})

        if (!autor) {
            throw new NotFoundException(`El autor con el ID ${id} no existe`);
        }

        autor.nombre = autorData.nombre ?? autor.nombre;
        autor.apellido = autorData.apellido?? autor.apellido;
        autor.dni = autorData.dni ?? autor.dni;
        
        return this.autoresRepository.save(autor);
    }

    async remove(id:number) : Promise<void>{
        await this.autoresRepository.delete(id)
    }
}
