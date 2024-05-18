// autores.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutoresService } from './autores.service';
import { AutoresController } from './autores.controller';
import { Autor } from './entities/autor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Autor]),
  ],
  controllers: [AutoresController],
  providers: [AutoresService],
})
export class AutoresModule {}
