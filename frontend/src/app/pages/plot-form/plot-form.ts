import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { PlotService } from "../../services/plot.service";
import { Router } from "@angular/router";
import { firstValueFrom } from "rxjs";

@Component({
    selector: "app-plot-form",
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: "./plot-form.html",
})
export class PlotFormComponent {
    form: FormGroup;
    errorMessage: string | null = null;

    constructor(
        private fb: FormBuilder,
        private plotService: PlotService,
        private router: Router
    ) {
        this.form = this.fb.group({
            name: ["", [Validators.required]],
            length: [null, [Validators.required, Validators.min(1)]],
            width: [null, [Validators.required, Validators.min(1)]]
        });
    }

    async onSubmit() {
        if (this.form.invalid) return;

        this.errorMessage = null;

        try {
            const res = await firstValueFrom(this.plotService.createPlot(this.form.value));
            console.log("Plot successfully created:", res);
            await this.router.navigate([`/plots/${res.id}/bands`]);
        } catch (error: any) {
            if (error.status === 409) {
                this.errorMessage = "Ce nom de parcelle existe déjà.";
            } else {
                this.errorMessage = "Une erreur est survenue.";
            }
        }
    }
}
