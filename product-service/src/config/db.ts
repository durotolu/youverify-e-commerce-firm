import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb://mongo:27017/productdb`);
    console.log("Product DB Connected");
  } catch (error) {
    console.error("Product DB Connection Error:", error);
    process.exit(1);
  }
  console.log("Product DB Connected");
};
