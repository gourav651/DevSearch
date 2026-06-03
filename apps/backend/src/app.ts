import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import sourceRoutes from "./routes/source.routes";

const app = express();

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "DevSearch API Running",
  });
});

app.use("/api/v1/sources", sourceRoutes);

export default app;