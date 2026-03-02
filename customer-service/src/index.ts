import express from "express";
import { connectDB } from "./config/db";
import customerRoutes from "./routes/customer.routes";
import { seedCustomer } from "./seed/seed";

const app = express();
app.use(express.json());

app.use("/customers", customerRoutes);

const start = async () => {
  await connectDB();
  await seedCustomer();

  app.listen(3001, () =>
    console.log("Customer Service running")
  );
};

start();
