import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibrosModule } from './libros/libros.module';
import { AutoresModule } from './autores/autores.module';
import { EditorialesModule } from './editoriales/editoriales.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localohost',
      port: 5432,
      username: 'postgres',
      password:'38matipere22',
      database:'libros-y-autores',
      entities: [],
      synchronize: true,

    }),
    LibrosModule,
    AutoresModule,
    EditorialesModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
