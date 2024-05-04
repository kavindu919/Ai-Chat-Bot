import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";

//make configaration for the dotenv
config();

const app = express();

//middleware for reaing json
app.use(express.json());

//make sure to delete this after production
app.use(morgan("dev"));

app.use("/api/v1", appRouter);

export default app;
