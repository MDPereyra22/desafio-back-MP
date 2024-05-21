import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Autor } from 'src/autores/entities/autor.entity';
import { Repository } from 'typeorm';
import { CreateAutorDto } from './dto/create-autor.dto';
import { UpdateAutorDto } from './dto/update-autor.dto';




@Injectable()
export class AutoresService {
    constructor(
        @InjectRepository(Autor)
        private autoresRepository: Repository<Autor>,
    ) {}

    async findAll(): Promise<Autor[]> {
        const autores = await this.autoresRepository.find();
        if (autores.length === 0) {
            throw new NotFoundException('No se encontraron autores.');
        }
        return autores;
    }

    async findOne(id: number): Promise<Autor> {
        const autor = await this.autoresRepository.findOne({ where: { id } });
        if (!autor) {
            throw new NotFoundException(`El autor con el ID ${id} no existe.`);
        }
        return autor;
    }

    async createAutor(createAutorDto: CreateAutorDto): Promise<Autor> {
        const autor = this.autoresRepository.create(createAutorDto);
        return this.autoresRepository.save(autor);
      }

      async updateAutor(id: number, updateAutorDto: UpdateAutorDto): Promise<Autor> {
        const autor = await this.autoresRepository.findOne({where: {id}});
    
        if (!autor) {
          throw new NotFoundException(`El autor con el ID ${id} no existe`);
        }
    
        autor.nombre = updateAutorDto.nombre ?? autor.nombre;
        autor.apellido = updateAutorDto.apellido ?? autor.apellido;
        autor.dni = updateAutorDto.dni ?? autor.dni;
    
        return this.autoresRepository.save(autor);
      }

    async removeAutor(id: number): Promise<void> {
        const result = await this.autoresRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`El autor con el ID ${id} no existe.`);
        }
    }
}
