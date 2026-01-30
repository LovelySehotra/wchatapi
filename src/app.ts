import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

/* ---------- Middlewares ---------- */
app.use(cors({
  origin: "*",
  credentials: true,
}));
app.use(express.json());

/* ---------- Health Check ---------- */
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "OK" });
});

/* ---------- Export App ---------- */
export default app;
