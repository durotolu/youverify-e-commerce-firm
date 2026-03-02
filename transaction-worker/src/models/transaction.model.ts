import mongoose from "mongoose";

const schema = new mongoose.Schema({
  customerId: String,
  orderId: String,
  productId: String,
  amount: Number
});

export default mongoose.model("Transaction", schema);
