import { Entity, PrimaryColumn, Column, ManyToMany } from "typeorm";
import { Libro } from "src/libros/entities/libro.entity";

@Entity()
export class Autor{
    @PrimaryColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column({unique: true})
    dni: string;

    @ManyToMany(()=> Libro, libro=> libro.autores)
    libros: Libro[]

}