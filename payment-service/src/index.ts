import express from "express";
import { connectDB } from "./config/db";
import paymentRoutes from "./routes/payment.routes";

const app = express();
app.use(express.json());

app.use("/payments", paymentRoutes);

const start = async () => {
  await connectDB();

  app.listen(process.env.PORT_PAYMENT || 3004, () =>
    console.log("Payment Service running")
  );
};

start();
