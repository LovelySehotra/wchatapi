import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/user/user.routes";
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


app.use("/auth", authRoutes);
app.use("/users",userRoutes)

/* ---------- Export App ---------- */
export default app;
