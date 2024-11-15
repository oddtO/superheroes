import express from "express";
import router from "./routes";
import cors from "cors";
import { errorMiddleware } from "./middleware/error-middleware";
import pool from "./db/pool";

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL }));

app.use("/api", router);

app.use(errorMiddleware);

export default app;
