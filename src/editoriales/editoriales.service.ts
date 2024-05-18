import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Editorial } from './entities/editorial.entity';

@Injectable()
export class EditorialesService {
    constructor(
        @InjectRepository(Editorial)
        private editorialesRepository : Repository<Editorial>
    ) {}

    findAll() : Promise<Editorial[]>{
        return this.editorialesRepository.find()
    }

    findOne(id: number) : Promise<Editorial>{
        return this.editorialesRepository.findOne({where: {id}})
    }

    createEditorial(editorial: Editorial) : Promise<Editorial>{
        return this.editorialesRepository.save(editorial);
    }

    async updateEditorial(id: number, editorial: Editorial) : Promise<Editorial>{
        await this.editorialesRepository.update(id, editorial);
        return this.findOne(id)
    }

    async removeEditorial(id: number) : Promise<void>{
        await this.editorialesRepository.delete(id);
    }
}
