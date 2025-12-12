import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import pixelRoutes from "./routes/pixelRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api", pixelRoutes);
// app.use("/", pixelRoutes);   // For /track routes

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
