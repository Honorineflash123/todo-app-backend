import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import taskRouter from "./src/routes/taskRoutes.js";
import cors from "cors";

dotenv.config({ path: ".env" });

const app = express();
const port = process.env.PORT || 8080;

/* ======================
   MongoDB Connection
====================== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

/* ======================
   Middlewares
====================== */
app.use(express.json());

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));

/* ======================
   Public routes (no auth)
====================== */
app.get("/", (req, res) => {
  res.status(200).send("Todo API is running");
});

app.get("/health", (req, res) => {
  res.status(200).json({ ok: true });
});

/* ======================
   Protected routes
====================== */
import isAuthenticated from "./src/configs/authenticationFilter.js"; // add this import at top

app.use("/api/todos", isAuthenticated, taskRouter);


/* ======================
   Start server
====================== */
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

