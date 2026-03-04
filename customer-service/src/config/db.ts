import mongoose from "mongoose";

/**
 * Connects to the MongoDB database for the customer service.
 * Exits the process if the connection fails.
 */
export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(
      process.env.MONGO_URL || "mongodb://mongo:27017/customerdb"
    );
    console.log("Customer DB Connected");
  } catch (error) {
    console.error("Customer DB Connection Error:", error);
    throw error;
  }
};
