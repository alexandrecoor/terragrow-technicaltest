import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PlotService } from "../../services/plot.service";
import { Plot } from "../../models/plot.model";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
    selector: "app-plot-list",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./plot-list.html",
})
export class PlotListComponent implements OnInit {
    plots$!: Observable<Plot[]>;

    constructor(
        private plotService: PlotService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.plots$ = this.plotService.getAllPlots();
    }

    goToBands(plotId: string) {
        this.router.navigate(["/plots", plotId, "bands"]);
    }
}
