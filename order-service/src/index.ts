import express from "express";
import { connectDB } from "./config/db";
import orderRoutes from "./routes/order.routes";
// import { seedCustomer } from "./seed/seed";

const app = express();
app.use(express.json());

app.use("/orders", orderRoutes);

const start = async () => {
  await connectDB();
  // await seedCustomer();

  app.listen(3001, () =>
    console.log("Order Service running")
  );
};

start();
