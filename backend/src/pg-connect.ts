import { DataSource } from "typeorm";
import { Plot } from "./entities/plot.entity";
import { Band } from "./entities/band.entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: false,
    entities: [Plot, Band]
});
