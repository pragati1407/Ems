import mongoose from "mongoose";

const connectToDatabase = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MONGO_URI not set in .env");
  }

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  console.log("✅ MongoDB connected successfully");
};

export default connectToDatabase;
