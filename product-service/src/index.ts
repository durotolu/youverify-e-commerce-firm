import express from "express";
import { connectDB } from "./config/db";
import productRoutes from "./routes/product.routes";

const app = express();
app.use(express.json());

app.use("/products", productRoutes);

const start = async () => {
  await connectDB();

  app.listen(3001, () =>
    console.log("Product Service running")
  );
};

start();
