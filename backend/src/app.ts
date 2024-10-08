import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

//make configaration for the dotenv
config();

const app = express();
//cors
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
//middleware for reaing json
app.use(express.json());
//for cookie
app.use(cookieParser(process.env.COOKIE_SECRET));

//make sure to delete this after production
app.use(morgan("dev"));

app.use("/api/v1", appRouter);

export default app;
