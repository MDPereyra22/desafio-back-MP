// libros.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibrosService } from './libros.service';
import { LibrosController } from './libros.controller';
import { Libro } from './entities/libro.entity';
import { Autor } from '../autores/entities/autor.entity';
import { Editorial } from '../editoriales/entities/editorial.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Libro, Autor, Editorial]),
  ],
  controllers: [LibrosController],
  providers: [LibrosService],
})
export class LibrosModule {}
