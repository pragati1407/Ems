import dotenv from "dotenv";
dotenv.config();

import User from "./models/User.js";
import bcrypt from "bcrypt";
import connectToDatabase from "./db/db.js";

const userRegister = async () => {
  await connectToDatabase();
  try {
    const existingUser = await User.findOne({ email: "admin@gmail.com" });

    if (existingUser) {
      console.log("⚠️ Admin user already exists");
    } else {
      const hashedPassword = await bcrypt.hash("admin123", 10);

      const newUser = new User({
        name: "Admin",
        email: "admin@gmail.com",
        password: hashedPassword,
        role: "admin",
      });

      await newUser.save();
      console.log("✅ Admin user created successfully!");
    }
  } catch (error) {
    console.log("❌ Error seeding user:", error);
  } finally {
    process.exit(0);
  }
};

userRegister();
