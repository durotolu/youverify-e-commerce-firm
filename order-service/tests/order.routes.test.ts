import request from "supertest";
import express from "express";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import Order from "../models/order.model";
import orderRoutes from "../routes/order.routes";
import { setupTestDB, teardownTestDB, clearDatabase } from '../../tests/setup';

const app = express();
app.use(express.json());
app.use("/orders", orderRoutes);

const mock = new MockAdapter(axios);

beforeAll(async () => {
  await setupTestDB();
});

afterEach(async () => {
  mock.reset();
  await clearDatabase();
});

afterAll(async () => {
  await teardownTestDB();
});

describe("Order Routes", () => {
  test("POST /orders - happy path", async () => {
    const productId = "prod123";
    const customerId = "cust456";

    mock.onGet(`http://product-service:3002/products/${productId}`).reply(200, {
      id: productId,
      price: 150
    });

    mock.onPost("http://payment-service:3004/payments").reply(200, { status: "success" });

    const res = await request(app).post("/orders").send({ customerId, productId });

    expect(res.status).toBe(200);
    expect(res.body.orderStatus).toBe("pending");
    expect(res.body.paymentStatus).toBe("success");

    const orderInDb = await Order.findOne({ customerId });
    expect(orderInDb).not.toBeNull();
    expect(orderInDb?.amount).toBe(150);
  });

  test("POST /orders - missing data", async () => {
    const res = await request(app).post("/orders").send({ customerId: "123" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Invalid order data");
  });

  test("POST /orders - product service fails", async () => {
    const productId = "prod123";
    const customerId = "cust456";

    mock.onGet(`http://product-service:3002/products/${productId}`).networkError();

    const res = await request(app).post("/orders").send({ customerId, productId });

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("message");
  });
});
