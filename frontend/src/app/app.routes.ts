import { Routes } from "@angular/router";

import { PlotFormComponent } from "./pages/plot-form/plot-form";
import { PlotListComponent } from "./pages/plot-list/plot-list";
import { PlotBandsComponent } from "./pages/band-list/band-list";

export const routes: Routes = [
    { path: "plots", component: PlotListComponent },
    { path: "plots/create", component: PlotFormComponent },
    { path: "plots/:id/bands", component: PlotBandsComponent }, // <- route plate
    { path: "", redirectTo: "/plots", pathMatch: "full" },
    { path: "**", redirectTo: "/plots" }
];
