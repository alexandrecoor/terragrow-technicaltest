import "reflect-metadata";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { AppDataSource } from "./pg-connect";
import plotRoutes from "./routes/plot.routes";

AppDataSource.initialize()
    .then(() => {
        const app = express();

        const corsOptions = {
            origin: ["http://localhost:4200"],
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            allowedHeaders: ["Content-Type", "Authorization"],
            optionsSuccessStatus: 200
        };

        app.use(cors(corsOptions));
        app.options("/", cors(corsOptions));

        app.use(bodyParser.json());
        app.use(plotRoutes);

        app.use((req, res) => {
            res.status(404).json({ error: `Route ${req.originalUrl} non trouvée.` });
        });

        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Backend running on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error("Failed to initialize DB:", err);
    });
