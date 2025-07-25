import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Plot } from "./plot.entity";

@Entity()
export class Band {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  number: number;

  @Column("float")
  length: number;

  @Column("float")
  width: number;

  @ManyToOne(() => Plot, plot => plot.bands)
  plot: Plot;
}
