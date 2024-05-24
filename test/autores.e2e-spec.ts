import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AutoresModule } from '../src/autores/autores.module';
import { AppModule } from 'src/app.module';
import { Autor } from 'src/autores/entities/autor.entity';
import { DataSource, Repository } from 'typeorm';
import { DataType, newDb } from 'pg-mem';
import { Libro } from 'src/libros/entities/libro.entity';
import { Editorial } from 'src/editoriales/entities/editorial.entity';

describe('Autores (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeEach(async () => {
    const db = newDb();
    // Register current_database function
    db.public.registerFunction({
      implementation: () => 'test',
      name: 'current_database',
    });
    
    db.public.registerFunction({
      name: "obj_description",
      args: [DataType.text, DataType.text],
      returns: DataType.text,
      implementation: () => "test",
  });

    db.public.registerFunction({
      name: 'version',
      implementation: () => 'Im not sure about PostgreSQL version',
    });

    dataSource = await db.adapters.createTypeormDataSource({
      type: "postgres",
      entities: [Libro, Editorial, Autor],
    });
    
    await dataSource.initialize();
    await dataSource.synchronize();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, AutoresModule],  
      providers: [Repository<Autor>],
    })
    .overrideProvider(DataSource)
    .useValue(dataSource)
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Crea un autor con POST y lo recupera exitosamente de la bd con un GET', async () => {
    await request(app.getHttpServer())
      .post('/autores')
      .send({
        "nombre": "JRR",
        "apellido": "Tolkien",
        "dni": "11223344"
      },)
      .expect(201)

    const getResponse = await request(app.getHttpServer())
      .get('/autores')      
      .expect(200)

    const autores = (getResponse.body as Array<Autor>)

    expect(autores.length).toEqual(1);
    expect(autores[0].apellido).toEqual('Tolkien');
    expect(autores[0].nombre).toEqual('JRR');
    expect(autores[0].dni).toEqual('11223344');
  });

  it('Crea un autor con POST, lo modifica con un PUT y lo recupera exitosamente de la bd con un GET', async () => {
    const autorCreado = await request(app.getHttpServer())
      .post('/autores')
      .send({
        "nombre": "JRR",
        "apellido": "Tolkien",
        "dni": "11223344"
      },)
      .expect(201)

    const idDelAutorCreado = (autorCreado.body as Autor).id

    await request(app.getHttpServer())
      .put(`/autores/${idDelAutorCreado}`)
      .send({
        "nombre": "JRR",
        "apellido": "Tolkien",
        "dni": "99999999"
      },)
      .expect(200)

    const getResponse = await request(app.getHttpServer())
      .get('/autores')      
      .expect(200)

    const autores = (getResponse.body as Array<Autor>)

    expect(autores.length).toEqual(1);
    expect(autores[0].dni).toEqual('99999999');
  });

  it('Crea un autor con POST, lo elimina con un DELETE y el get devuelve 404', async () => {
    const autorCreado = await request(app.getHttpServer())
      .post('/autores')
      .send({
        "nombre": "JRR",
        "apellido": "Tolkien",
        "dni": "11223344"
      },)
      .expect(201)

    const idDelAutorCreado = (autorCreado.body as Autor).id

    await request(app.getHttpServer())
      .delete(`/autores/${idDelAutorCreado}`)
      .expect(200)

    await request(app.getHttpServer())
      .get('/autores')      
      .expect(404)

  });
});
