import express from "express";
import { connectDB } from "./config/db";
import productRoutes from "./routes/product.routes";
import { seedProducts } from "./seed/seed";

export const app = express();
app.use(express.json());
app.use("/products", productRoutes);

if (process.env.NODE_ENV !== "test") {
  const start = async () => {
    await connectDB();
    await seedProducts();

    app.listen(3002, () =>
      console.log("Product Service running")
    );
  };
  start();
}
