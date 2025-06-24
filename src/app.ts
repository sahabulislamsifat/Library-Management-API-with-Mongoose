import express, { Request, Response } from "express";
import cors from "cors";
import routes from "./routes";

export const app = express();

app.use([cors(), express.json()]);

app.use(routes);

app.get("/", (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "Welcome to Library Management API",
  });
});
