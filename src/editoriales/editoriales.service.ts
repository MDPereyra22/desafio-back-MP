import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Editorial } from './entities/editorial.entity';
import { CreateEditorialDto } from './dto/create-editorial.dto';
import { UpdateEditorialDto } from './dto/update-editorial.dto';

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

    async createEditorial(createEditorialDto: CreateEditorialDto): Promise<Editorial> {
        const editorial = this.editorialesRepository.create(createEditorialDto);
        return this.editorialesRepository.save(editorial);
      }

      async updateEditorial(id: number, updateEditorialDto: UpdateEditorialDto): Promise<Editorial> {
        const editorial = await this.editorialesRepository.findOne({where:{id}});
    
        if (!editorial) {
          throw new NotFoundException(`La editorial con el ID ${id} no existe`);
        }
    
        editorial.nombre = updateEditorialDto.nombre ?? editorial.nombre;
        editorial.direccion = updateEditorialDto.direccion ?? editorial.direccion;
        editorial.cuit = updateEditorialDto.cuit ?? editorial.cuit;
    
        return this.editorialesRepository.save(editorial);
      }

    async removeEditorial(id: number): Promise<void> {
        const result = await this.editorialesRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`La editorial con el ID ${id} no existe.`);
        }
    }
}
