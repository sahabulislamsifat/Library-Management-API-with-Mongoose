import express, { Request, Response } from "express";
import cors from "cors";
import routes from "./routes";
import { requestLogger } from "./middlewares/requestLogger";

export const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// API Routes
app.use("/api", routes);

// Health Check Route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Library Management API",
  });
});
