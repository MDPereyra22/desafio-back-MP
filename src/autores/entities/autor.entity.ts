import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Libro } from "src/libros/entities/libro.entity";
import { IsDNI } from "src/validators/dni.validators";
import { ApiHideProperty } from "@nestjs/swagger";

@Entity()
export class Autor{
    @PrimaryGeneratedColumn()
    @ApiHideProperty()
    id: number;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column({unique: true})
    @IsDNI({ message: 'El DNI debe ser un número de 7 u 8 dígitos' })
    dni: string;

    @ManyToMany(()=> Libro, libro=> libro.autores)
    @ApiHideProperty()
    libros: Libro[]

}