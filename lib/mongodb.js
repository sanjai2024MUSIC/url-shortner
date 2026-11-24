
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

async function connectDB() {
  try {
    if (!MONGODB_URI) {
      throw new Error("MongoDB connection string is missing");
    }

    await mongoose.connect(MONGODB_URI);

    console.log("MongoDB connected successfully");

  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error;
  }
}

export default connectDB;
