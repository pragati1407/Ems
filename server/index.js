import dotenv from "dotenv";
dotenv.config(); // <--- must be first, before importing/using env vars

import express from "express";
import cors from "cors";
import connectToDatabase from "./db/db.js";
import authRouter from "./routes/auth.js";

connectToDatabase()
const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRouter);

// start server AFTER DB is connected
const PORT = process.env.PORT || 5000;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to DB:", err.message);
    process.exit(1);
  });
