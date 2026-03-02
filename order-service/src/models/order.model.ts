import mongoose from "mongoose";

export enum OrderStatus {
  PENDING = "pending",
}

const schema = new mongoose.Schema({
  customerId: String,
  productId: String,
  amount: Number,
  orderStatus: {
    type: String,
    default: OrderStatus.PENDING,
  },
});

export default mongoose.model("Order", schema);
