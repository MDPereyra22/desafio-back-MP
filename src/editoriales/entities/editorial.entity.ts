import { Entity, PrimaryColumn, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Libro } from "src/libros/entities/libro.entity";
import { IsCUIT } from "src/validators/cuit.validators";
import { ApiHideProperty } from "@nestjs/swagger";

@Entity()
export class Editorial{
    @PrimaryGeneratedColumn()
    @ApiHideProperty()
    id: number;

    @Column()
    nombre: string;

    @Column()
    direccion: string;

    @Column({ unique: true })
    @IsCUIT({ message: 'El CUIT debe ser un número de 11 dígitos' })
    cuit: string;

    @ManyToOne(()=>Libro, libro => libro.editorial)
    @ApiHideProperty()
    libros: Libro[];
}
