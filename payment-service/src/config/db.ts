import mongoose from "mongoose";

export const connectDB = async () => {
  const mongoURI =
    process.env.MONGO_URI ||
    process.env.MONGO_URI_PAYMENT_DOCKER ||
    "mongodb://mongo:27017/paymentdb";
  try {
    await mongoose.connect(mongoURI);
    console.log("Payment DB Connected");
  } catch (error) {
    console.error("Payment DB Connection Error:", error);
    throw error;
  }
  console.log("Payment DB Connected");
};
