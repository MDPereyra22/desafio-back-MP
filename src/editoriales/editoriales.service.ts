import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Editorial } from './entities/editorial.entity';

@Injectable()
export class EditorialesService {
    constructor(
        @InjectRepository(Editorial)
        private editorialesRepository : Repository<Editorial>
    ) {}

    async findAll(): Promise<Editorial[]> {
        const editoriales = await this.editorialesRepository.find();
        if (editoriales.length === 0) {
            throw new NotFoundException('No se encontraron editoriales.');
        }
        return editoriales;
    }

    async findOne(id: number): Promise<Editorial> {
        const editorial = await this.editorialesRepository.findOne({ where: { id } });
        if (!editorial) {
            throw new NotFoundException(`La editorial con el ID ${id} no existe.`);
        }
        return editorial;
    }

    createEditorial(editorial: Editorial) : Promise<Editorial>{
        return this.editorialesRepository.save(editorial);
    }

    async updateEditorial(id: number, editorialData: Partial<Editorial>) : Promise<Editorial>{
        const editorial = await this.editorialesRepository.findOne( {where: {id}})
        if (!editorial) {
            throw new NotFoundException(`La editorial con el ID ${id} no existe`);
        }
        editorial.nombre = editorialData.nombre ?? editorial.nombre;
        editorial.direccion = editorialData.direccion ?? editorial.direccion;
        editorial.cuit = editorialData.cuit ?? editorial.cuit;

        return this.editorialesRepository.save(editorial);

    }

    async removeEditorial(id: number): Promise<void> {
        const result = await this.editorialesRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`La editorial con el ID ${id} no existe.`);
        }
    }
}
