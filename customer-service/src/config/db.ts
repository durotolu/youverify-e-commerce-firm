import mongoose from "mongoose";

/**
 * Connects to the MongoDB database for the customer service.
 * Exits the process if the connection fails.
 */
export const connectDB = async (): Promise<void> => {
  const mongoURI =
    process.env.MONGO_URI ||
    process.env.MONGO_URI_CUSTOMER_DOCKER ||
    "mongodb://mongo:27017/customerdb";

  try {
    await mongoose.connect(mongoURI);
    console.log("Customer DB Connected:", mongoURI);
  } catch (error) {
    console.error("Customer DB Connection Error:", error);
    throw error;
  }
};
