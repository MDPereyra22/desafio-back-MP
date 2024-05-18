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

    async updateAutor(id: number, autor: Autor) : Promise<Autor>{
        await this.autoresRepository.update(id, autor)
        return this.findOne(id);
    }

    async remove(id:number) : Promise<void>{
        await this.autoresRepository.delete(id)
    }
}
