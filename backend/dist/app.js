import express from "express";
import { config } from "dotenv";
//make configaration for the dotenv
config();
const app = express();
//middleware for reaing json
app.use(express.json());
export default app;
//# sourceMappingURL=app.js.map