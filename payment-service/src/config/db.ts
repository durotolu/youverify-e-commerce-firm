import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb://mongo:27017/paymentdb`);
    console.log("Payment DB Connected");
  } catch (error) {
    console.error("Payment DB Connection Error:", error);
    process.exit(1);
  }
  console.log("Payment DB Connected");
};
