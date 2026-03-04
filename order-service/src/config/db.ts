import mongoose from "mongoose";

export const connectDB = async () => {
  const mongoURI =
    process.env.MONGO_URI ||
    process.env.MONGO_URI_ORDER_DOCKER ||
    "mongodb://mongo:27017/orderdb";

  try {
    await mongoose.connect(mongoURI);
    console.log("Order DB Connected:", mongoURI);
  } catch (error) {
    console.error("Order DB Connection Error:", error);
    throw error;
  }
  console.log("Order DB Connected");
};
