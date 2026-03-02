import mongoose from "mongoose";

export interface Customer {
  name: string;
  email: string;
}

const schema = new mongoose.Schema<Customer>({
  name: String,
  email: String,
});

export default mongoose.model("Customer", schema);
