import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import candidateRoutes from "./routes/candidateRoutes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/candidates", candidateRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Smart Resume Analyzer API Running...");
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
