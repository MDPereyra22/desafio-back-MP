import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Libro } from './entities/libro.entity';
import { Autor } from 'src/autores/entities/autor.entity';
import { Editorial } from 'src/editoriales/entities/editorial.entity';


@Injectable()
export class LibrosService {
    constructor(
        @InjectRepository(Libro)
        private librosRepository: Repository<Libro>,
        @InjectRepository(Autor)
        private autoresRepository: Repository<Autor>,
        @InjectRepository(Editorial)
        private editorialesRepository: Repository<Editorial>,
    ) { }

    findAll(): Promise<Libro[]> {
        return this.librosRepository.find({ relations: ['autores', 'editorial'] })
    }

    async findOne(id: number): Promise<Libro> {
        const libro = await this.librosRepository.findOne({
            where: { id },
            relations: ['autores', 'editorial']
        }
        )
        if (!libro) {
            throw new NotFoundException(`El libro con el ID ${id} no existe`)
        }
        return libro;
    }

    async createLibro(libro: Libro): Promise<Libro>{
        if(libro.autores && libro.autores.length > 0){
            for (const autor of libro.autores) {
                const autorExistente = await this.autoresRepository.findOne({where: {id: autor.id}});
                if (!autorExistente){
                    throw new NotFoundException(`El autor con el ID ${autor.id} no existe`)
                } 
                
            }
        }
        
        if(libro.editorial){
            const editorialExistente = await this.editorialesRepository.findOne({where: {id: libro.editorial.id}})
            if(!editorialExistente){
                throw new NotFoundException(`La editorial con el ID ${libro.editorial.id} no existe`)
            }
        }

        return this.librosRepository.save(libro)
    }


    async updateLibro(id: number, libro: Libro) : Promise<Libro> {
        await this.librosRepository.update(id, libro);
        return this.findOne(id);
    }

    async removeLibro(id:number) : Promise<void>{
        await this.librosRepository.delete(id)
    }
}
