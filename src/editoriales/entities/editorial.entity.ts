import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { Libro } from "src/libros/entities/libro.entity";

@Entity()
export class Editorial{
    @PrimaryColumn()
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
