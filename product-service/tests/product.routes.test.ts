import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import Product from "../src/models/product.model";
import productRoutes from "../src/routes/product.routes";
import { setupTestDB, teardownTestDB, clearDatabase } from "./setup";

const app = express();
app.use(express.json());
app.use("/products", productRoutes);

beforeAll(async () => {
  await setupTestDB();
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await teardownTestDB();
});

describe("Product Routes", () => {
  let productId: string;

  beforeAll(async () => {
    const product = await Product.create({ name: "Phone", price: 500 });
    productId = product._id.toString();
  });

  test("GET /products/:id - valid ID", async () => {
    const res = await request(app).get(`/products/${productId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("name", "Phone");
  });

  test("GET /products/:id - invalid ID", async () => {
    const res = await request(app).get("/products/123");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error", "Invalid product ID");
  });

  test("GET /products/:id - not found", async () => {
    const res = await request(app).get(`/products/${new mongoose.Types.ObjectId()}`);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error", "Product not found");
  });
});
