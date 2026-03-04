import express from "express";
import { connectDB } from "./config/db";
import orderRoutes from "./routes/order.routes";

export const app = express();
app.use(express.json());

app.use("/orders", orderRoutes);

if (process.env.NODE_ENV !== "test") {
  const start = async () => {
    await connectDB();

    app.listen(process.env.PORT_ORDER || 3003, () =>
      console.log("Order Service running")
    );
  };

  start();
}
