import { AppDataSource } from "../pg-connect";
import { Plot } from "../entities/plot.entity";
import { Band } from "../entities/band.entity";

const BAND_WIDTH = 1.2;

export class PlotService {
    static async createPlot(name: string, length: number, width: number) {
        const plotRepo = AppDataSource.getRepository(Plot);

        const existing = await plotRepo.findOneBy({ name });
        if (existing) throw new Error("CONFLICT_NAME");

        const bandCount = Math.floor(width / BAND_WIDTH);

        const bands: Band[] = Array.from({ length: bandCount }).map((_, i) => {
            const band = new Band();
            band.number = i + 1;
            band.length = length;
            band.width = BAND_WIDTH;
            return band;
        });

        const plot = plotRepo.create({ name, length, width, bands });
        await plotRepo.save(plot);
        return plot;
    }

    static async getAllPlotsWithBandCount() {
        const plots = await AppDataSource.getRepository(Plot).find({
            relations: ["bands"]
        });

        return plots.map((plot) => ({
            id: plot.id,
            name: plot.name,
            length: plot.length,
            width: plot.width,
            bandCount: plot.bands.length
        }));
    }

    static async getBandsByPlotId(id: string) {
        const plot = await AppDataSource.getRepository(Plot).findOne({
            where: { id },
            relations: ["bands"]
        });

        if (!plot) throw new Error("NOT_FOUND");
        return plot.bands;
    }
}
