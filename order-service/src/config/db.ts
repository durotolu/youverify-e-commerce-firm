import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL || `mongodb://mongo:27017/orderdb`);
    console.log("Order DB Connected");
  } catch (error) {
    console.error("Order DB Connection Error:", error);
    throw error;
  }
  console.log("Order DB Connected");
};
