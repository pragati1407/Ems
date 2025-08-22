import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // load .env file

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// Use PORT from .env or fallback to 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
