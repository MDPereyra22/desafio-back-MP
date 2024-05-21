import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibrosModule } from './libros/libros.module';
import { AutoresModule } from './autores/autores.module';
import { EditorialesModule } from './editoriales/editoriales.module';
import { Libro } from './libros/entities/libro.entity';
import { Editorial } from './editoriales/entities/editorial.entity';
import { Autor } from './autores/entities/autor.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [Libro, Editorial, Autor],
        synchronize: true,  
      }),
      inject: [ConfigService],
    }),
    LibrosModule,
    AutoresModule,
    EditorialesModule,
  ],
})
export class AppModule {}