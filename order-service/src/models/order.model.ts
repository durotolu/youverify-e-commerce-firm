import mongoose from "mongoose";

export enum OrderStatus {
  PENDING = "pending",
}

const schema = new mongoose.Schema({
  customerId: { type: String, required: true },
  productId: { type: String, required: true },
  amount: { type: Number, required: true },
  status: {
    type: String,
    default: OrderStatus.PENDING,
  },
});

export default mongoose.model("Order", schema);
