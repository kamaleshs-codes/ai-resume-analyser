import express from "express";
import authRoutes from "./modules/auth/routes/auth.routes.js";
import resumeRoutes from "./modules/resume/routes/resume.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import cors from "cors";
import { env } from "./config/env.js";

const app = express();

app.use(
  cors({
    origin: env.CLIENT_URL,
  }),
);

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/resumes", resumeRoutes);

app.get("/", (req, res) => {
  res.send("ResumePilot AI backend");
});

app.use(errorHandler);

export default app;
