import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { PlotService } from "../../services/plot.service";
import { Band } from "../../models/band.model";

@Component({
    selector: "app-plot-bands",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./band-list.html"
})
export class PlotBandsComponent implements OnInit {
    bands: Band[] = [];
    plotName: string = "";
    isLoading = true;

    constructor(
        private route: ActivatedRoute,
        private plotService: PlotService
    ) {}

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get("id");
        if (!id) return;

        this.plotService.getBandsByPlotId(id).subscribe({
            next: (bands) => {
                this.bands = bands;
            },
            error: (err) => {
                console.error("Erreur lors du fetch des bandes :", err);
                this.bands = [];
            }
        });

        this.plotService.getAllPlots().subscribe({
            next: (plots) => {
                const plot = plots.find((p) => p.id === id);
                this.plotName = plot?.name ?? "(Nom inconnu)";
                this.isLoading = false;
            },
            error: (err) => {
                console.error("Erreur lors du fetch des plots :", err);
                this.plotName = "(Nom inconnu)";
                this.isLoading = false;
            }
        });
    }
}
