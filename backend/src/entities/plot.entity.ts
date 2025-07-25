import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Band } from "./band.entity";

@Entity()
export class Plot {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column("float")
    length: number;

    @Column("float")
    width: number;

    @OneToMany(() => Band, (band) => band.plot, { cascade: true })
    bands: Band[];
}
