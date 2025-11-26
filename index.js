import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import taskRouter from "./src/routes/taskRoutes.js";
import cors from "cors";

dotenv.config({ path: '.env' });

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
const port = process.env.PORT || 4000;

try {
  // connecting to MongoDB
  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
  });
} catch (error) {
  console.error(`Error connecting to MongoDB: ${error}`);
}

app.use(express.json());
const corsOptions = {
  origin: "*", // Allow requests from this origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed HTTP methods
  credentials: true, // Allow cookies if needed
};

app.use(cors(corsOptions));

app.use("/api/todos", taskRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})

