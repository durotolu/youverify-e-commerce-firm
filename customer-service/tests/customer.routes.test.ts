import request from "supertest";
import express from "express";
import customerRoutes from "../routes/customer.routes";
import mongoose from "mongoose";
import Customer from "../models/customer.model";
import { setupTestDB, teardownTestDB, clearDatabase } from '../../tests/setup';


beforeAll(async () => {
  await setupTestDB();
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await teardownTestDB();
});

const app = express();
app.use(express.json());
app.use("/customers", customerRoutes);

describe("Customer Routes", () => {
  let customerId: string;

  beforeAll(async () => {
    const customer = await Customer.create({ name: "Alice", email: "alice@test.com" });
    customerId = customer._id.toString();
  });

  test("GET /customers/:id - valid ID", async () => {
    const res = await request(app).get(`/customers/${customerId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("name", "Alice");
  });

  test("GET /customers/:id - invalid ID", async () => {
    const res = await request(app).get(`/customers/123`);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error", "Invalid customer ID");
  });

  test("GET /customers/:id - not found", async () => {
    const res = await request(app).get(`/customers/${new mongoose.Types.ObjectId()}`);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error", "Customer not found");
  });
});
