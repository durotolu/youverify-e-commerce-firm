import express from "express";
import { connectDB } from "./config/db";
import orderRoutes from "./routes/order.routes";

const app = express();
app.use(express.json());

app.use("/orders", orderRoutes);

const start = async () => {
  await connectDB();

  app.listen(3003, () =>
    console.log("Order Service running")
  );
};

start();
