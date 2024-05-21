import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Libro } from './entities/libro.entity';
import { Autor } from 'src/autores/entities/autor.entity';
import { Editorial } from 'src/editoriales/entities/editorial.entity';
import * as moment from 'moment';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';


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

    async createLibro(createLibroDto: CreateLibroDto): Promise<Libro> {
        const { autores, editorial, ...libroData } = createLibroDto;
    
        const autoresEntities = [];
        for (const autor of autores) {
          const autorExistente = await this.autoresRepository.findOne({ where: { id: autor.id } });
          if (!autorExistente) {
            throw new NotFoundException(`El autor con el ID ${autor.id} no existe`);
          }
          autoresEntities.push(autorExistente);
        }
    
        const editorialExistente = await this.editorialesRepository.findOne({ where: { id: editorial.id } });
        if (!editorialExistente) {
          throw new NotFoundException(`La editorial con el ID ${editorial.id} no existe`);
        }
    
        const libro = this.librosRepository.create({
          ...libroData,
          autores: autoresEntities,
          editorial: editorialExistente,
        });
    
        libro.fechaLanzamiento = this.normalizeDate(libro.fechaLanzamiento);
    
        return this.librosRepository.save(libro);
      }


      async updateLibro(id: number, updateLibroDto: UpdateLibroDto): Promise<Libro> {
        const libro = await this.librosRepository.findOne({
          where: { id },
          relations: ['autores', 'editorial']
        });
    
        if (!libro) {
          throw new NotFoundException(`El libro con el ID ${id} no existe`);
        }
    
        libro.titulo = updateLibroDto.titulo ?? libro.titulo;
        libro.categoria = updateLibroDto.categoria ?? libro.categoria;
        libro.precio = updateLibroDto.precio ?? libro.precio;
        libro.descripcion = updateLibroDto.descripcion ?? libro.descripcion;
    
        if (updateLibroDto.fechaLanzamiento) {
          libro.fechaLanzamiento = this.normalizeDate(updateLibroDto.fechaLanzamiento);
        }
    
        if (updateLibroDto.autores && updateLibroDto.autores.length > 0) {
          const autores = [];
          for (const autor of updateLibroDto.autores) {
            const autorExistente = await this.autoresRepository.findOne({ where: { id: autor.id } });
            if (!autorExistente) {
              throw new NotFoundException(`El autor con el ID ${autor.id} no existe`);
            }
            autores.push(autorExistente);
          }
          libro.autores = autores;
        }
    
        if (updateLibroDto.editorial) {
          const editorialExistente = await this.editorialesRepository.findOne({ where: { id: updateLibroDto.editorial.id } });
          if (!editorialExistente) {
            throw new NotFoundException(`La editorial con el ID ${updateLibroDto.editorial.id} no existe`);
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


