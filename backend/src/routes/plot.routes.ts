import { Router } from "express";
import { PlotService } from "../services/plots.service";

const router = Router();
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

router.post("/plots", async (req, res) => {
    const { name, length, width } = req.body;

    if (!name || typeof name !== "string") {
        return res.status(400).json({ error: "Missing or invalid 'name'" });
    }
    if (!length || typeof length !== "number" || length <= 0) {
        return res.status(400).json({ error: "Missing or invalid 'length'" });
    }
    if (!width || typeof width !== "number" || width <= 0) {
        return res.status(400).json({ error: "Missing or invalid 'width'" });
    }
    if (length > 10000 || width > 10000) {
        return res.status(400).json({ message: "The length and width must not exceed 10,000 meters." });
    }

    try {
        const plot = await PlotService.createPlot(name, length, width);
        res.status(201).json(plot);
    } catch (err) {
        if (err instanceof Error && err.message === "CONFLICT_NAME") {
            return res.status(409).json({ error: "A plot with this name already exists." });
        }
        console.error(err);
        res.status(500).json({ error: "Error creating plot" });
    }
});

router.get("/plots", async (_req, res) => {
    const result = await PlotService.getAllPlotsWithBandCount();
    res.json(result);
});

router.get("/plots/:id/bands", async (req, res) => {
    const id = req.params.id;

    if (!UUID_REGEX.test(id)) {
        return res.status(400).json({ error: "Invalid plot ID format" });
    }

    try {
        const bands = await PlotService.getBandsByPlotId(id);
        res.json(bands);
    } catch (err) {
        if (err instanceof Error && err.message === "NOT_FOUND") {
            return res.status(404).json({ error: "Plot not found" });
        }
        console.error(err);
        res.status(500).json({ error: "Unexpected error" });
    }
});

export default router;
