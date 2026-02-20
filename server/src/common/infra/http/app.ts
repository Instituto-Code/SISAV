import express from "express";
import cors from "cors";
import router from "./routes.js";
import { ErrorHandler } from "./error-handler.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", router);
app.use(ErrorHandler);

export { app };