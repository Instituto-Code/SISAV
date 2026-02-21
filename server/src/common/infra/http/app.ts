import express from "express";
import cors from "cors";
import router from "./routes.js";
import { ErrorHandler } from "./error-handler.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "SISAV API",
            version: "1.0.0",
        }
    },
    apis: ["./src/modules/**/*.ts"]
}

const swaggerSpec = swaggerJSDoc(options)

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); 
app.use("/api", router);
app.use(ErrorHandler);

export { app };