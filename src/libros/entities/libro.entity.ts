import { Autor } from "src/autores/entities/autor.entity";
import { Editorial } from "src/editoriales/entities/editorial.entity";
import { Entity, PrimaryColumn, Column, JoinTable, ManyToMany, ManyToOne } from "typeorm";

@Entity()
export class Libro{
    @PrimaryColumn()
    id: number;

    @Column()
    titulo: string;

    @Column()
    categoria: string;

    @Column()
    precio: number;

    @Column({type:"date"})
    fechaLanzamiento: string;

    @Column('text')
    descripcion: string;

    @ManyToMany(() => Autor, autor => autor.libros)
    @JoinTable()
    autores: Autor[];

    @ManyToOne(()=> Editorial, editorial => editorial.libros)
    editorial: Editorial;

}