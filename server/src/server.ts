import "dotenv/config";

import express from "express";
import cors from "cors";
import { connectDatabase } from "./config/database";
import apiRoutes from "./routing/api"

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "SIM Edukasi API is running",
  });
});

app.use("/api", apiRoutes)

async function startServer(): Promise<void> {
  await connectDatabase();
  app.listen(PORT, () => {
    console.log(
      `Server running on http://localhost:${PORT}`
    );
  });
}

startServer();