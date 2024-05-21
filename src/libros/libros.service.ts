import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Libro } from './entities/libro.entity';
import { Autor } from 'src/autores/entities/autor.entity';
import { Editorial } from 'src/editoriales/entities/editorial.entity';
import * as moment from 'moment';


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

    async findAll(filter?: string, page?: number, limit?: number): Promise<Libro[]> {
        const queryBuilder = this.librosRepository.createQueryBuilder('libro')
          .leftJoinAndSelect('libro.autores', 'autor')
          .leftJoinAndSelect('libro.editorial', 'editorial');
    
        if (filter) {
          queryBuilder.andWhere('libro.categoria = :filter', { filter });
        }
    
        if (page && limit) {
          queryBuilder.skip((page - 1) * limit).take(limit);
        }
    
        return queryBuilder.getMany();
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

    async createLibro(libro: Libro): Promise<Libro> {
        try {
            if (!libro.autores || libro.autores.length === 0) {
                throw new BadRequestException('El libro debe tener al menos un autor.');
            }

            for (const autor of libro.autores) {
                const autorExistente = await this.autoresRepository.findOne({ where: { id: autor.id } });
                if (!autorExistente) {
                    throw new NotFoundException(`El autor con el ID ${autor.id} no existe`);
                }
            }

            if (!libro.editorial) {
                throw new BadRequestException('El libro debe tener una editorial.');
            }

            const editorialExistente = await this.editorialesRepository.findOne({ where: { id: libro.editorial.id } });
            if (!editorialExistente) {
                throw new NotFoundException(`La editorial con el ID ${libro.editorial.id} no existe`);
            }

            libro.fechaLanzamiento = this.normalizeDate(libro.fechaLanzamiento);

            return await this.librosRepository.save(libro);
        } catch (error) {
            throw new BadRequestException(`Error al crear el libro: ${error.message}`);
        }
    }


    async updateLibro(id: number, libroData: Partial<Libro>): Promise<Libro> {
        const libro = await this.librosRepository.findOne({
            where: { id },
            relations: ['autores', 'editorial']
        });
    
        if (!libro) {
            throw new NotFoundException(`El libro con el ID ${id} no existe`);
        }
    
        libro.titulo = libroData.titulo ?? libro.titulo;
        libro.categoria = libroData.categoria ?? libro.categoria;
        libro.precio = libroData.precio ?? libro.precio;
        libro.descripcion = libroData.descripcion ?? libro.descripcion;
    
        if (libroData.fechaLanzamiento) {
            libro.fechaLanzamiento = this.normalizeDate(libroData.fechaLanzamiento);
        }
    
        if (libroData.autores && libroData.autores.length > 0) {
            const autores = [];
            for (const autor of libroData.autores) {
                const autorExistente = await this.autoresRepository.findOne({ where: { id: autor.id } });
                if (!autorExistente) {
                    throw new NotFoundException(`El autor con el ID ${autor.id} no existe`);
                }
                autores.push(autorExistente);
            }
            libro.autores = autores;
        }
    
        if (libroData.editorial) {
            const editorialExistente = await this.editorialesRepository.findOne({ where: { id: libroData.editorial.id } });
            if (!editorialExistente) {
                throw new NotFoundException(`La editorial con el ID ${libroData.editorial.id} no existe`);
            }
            libro.editorial = editorialExistente;
        }
    
        return this.librosRepository.save(libro);
    }
    

    async removeLibro(id:number) : Promise<void>{
        const result = await this.librosRepository.delete(id)
        if(result.affected === 0){
            throw new NotFoundException(`El libro con el ID ${id} no existe.`)
        }
    }



    private normalizeDate(dateStr: string): string {
        const formats = ['DD/MM/YYYY', 'DD/MM/YY'];
        const date = moment(dateStr, formats, true);

        if (!date.isValid()) {
            throw new BadRequestException(`Formato de fecha inválido: ${dateStr}`);
        }

        return date.toISOString();
    }

}


