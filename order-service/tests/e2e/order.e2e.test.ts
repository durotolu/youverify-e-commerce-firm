import request from "supertest";
import { app } from "../../src/index";
import Order from "../../src/models/order.model";
import { setupTestDB, teardownTestDB, clearDatabase } from '../setup';
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

const mock = new MockAdapter(axios);

describe("E2E Order Service", () => {
  beforeAll(async () => {
    await setupTestDB();
  });

  jest.setTimeout(30000);

  afterEach(async () => {
    mock.reset();
    await clearDatabase();
  });

  afterAll(async () => {
    await teardownTestDB();
  });

  test("should create an order end-to-end", async () => {
    mock.onGet("http://product-service:3002/products/prod123").reply(200, { id: "prod123", price: 200 });
    mock.onPost("http://payment-service:3004/payments").reply(200, { status: "success" });

    const res = await request(app)
      .post("/orders")
      .send({ customerId: "cust789", productId: "prod123" });

    expect(res.status).toBe(200);
    expect(res.body.paymentStatus).toBe("success");

    const order = await Order.findOne({ customerId: "cust789" });
    expect(order).not.toBeNull();
  });
});
