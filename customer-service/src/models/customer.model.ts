import mongoose from "mongoose";

/**
 * Interface representing a customer document.
 */
export interface Customer {
  name: string;
  email: string;
}

/**
 * Mongoose schema for the Customer model.
 */
const schema = new mongoose.Schema<Customer>({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

/**
 * Mongoose model for Customer collection.
 */
export default mongoose.model<Customer>("Customer", schema);
