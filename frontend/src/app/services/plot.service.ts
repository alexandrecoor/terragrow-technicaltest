import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Plot } from "../models/plot.model";
import { Band } from "../models/band.model";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class PlotService {
    private readonly apiUrl = "http://localhost:3000";

    constructor(private http: HttpClient) {}

    getAllPlots(): Observable<Plot[]> {
        return this.http.get<Plot[]>(`${this.apiUrl}/plots`);
    }

    getBandsByPlotId(id: string): Observable<Band[]> {
        return this.http.get<Band[]>(`${this.apiUrl}/plots/${id}/bands`);
    }

    createPlot(plot: { name: string; length: number; width: number }): Observable<Plot> {
        return this.http.post<Plot>(`${this.apiUrl}/plots`, plot);
    }
}
