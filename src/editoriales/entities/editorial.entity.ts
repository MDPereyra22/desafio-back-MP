import { Entity, PrimaryColumn, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Libro } from "src/libros/entities/libro.entity";

@Entity()
export class Editorial{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    direccion: string;

    @Column({ unique: true })
    cuit: string;

    @ManyToOne(()=>Libro, libro => libro.editorial)
    libros: Libro[];
}
