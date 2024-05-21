import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibrosModule } from './libros/libros.module';
import { AutoresModule } from './autores/autores.module';
import { EditorialesModule } from './editoriales/editoriales.module';
import { Libro } from './libros/entities/libro.entity';
import { Editorial } from './editoriales/entities/editorial.entity';
import { Autor } from './autores/entities/autor.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password:'38matipere22',
      database:'libros-y-autores',
      entities: [Libro, Editorial, Autor],
      synchronize: true,

    }),
    LibrosModule,
    AutoresModule,
    EditorialesModule,
],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule { }
