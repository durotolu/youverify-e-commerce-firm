import request from "supertest";
import express from "express";
import paymentRoutes from "../../src/routes/payment.routes";
import * as publisher from "../../src/messaging/publisher";
import { setupTestDB, teardownTestDB } from "../setup";

jest.setTimeout(20000);

const app = express();
app.use(express.json());
app.use("/payments", paymentRoutes);

beforeAll(async () => {
  jest.spyOn(publisher, "publishTransaction").mockResolvedValue(undefined);
  await setupTestDB();
});

afterAll(async () => {
  await teardownTestDB();
});

describe("Payment E2E", () => {
  it("should process payment", async () => {
    const response = await request(app)
      .post("/payments")
      .send({
        customerId: "c1",
        orderId: "o1",
        amount: "100",
        productId: "p1",
      });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("Payment Processing (success)");
  });
});
