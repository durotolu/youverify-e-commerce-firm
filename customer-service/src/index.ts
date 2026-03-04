import express from "express";
import { connectDB } from "./config/db";
import customerRoutes from "./routes/customer.routes";
import { seedCustomer } from "./seed/seed";
import dotenv from "dotenv";

dotenv.config();

export const app = express();
app.use(express.json());

app.use("/customers", customerRoutes);

/**
 * Start the server (only if not testing)
 */
if (process.env.NODE_ENV !== "test") {
  const start = async () => {
    await connectDB();
    await seedCustomer();

    app.listen(process.env.PORT_CUSTOMER || 3001, () =>
      console.log("Customer Service running")
    );
  };

  start();
}
