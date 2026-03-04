import request from "supertest";
import express from "express";
import paymentRoutes from "../routes/payment.routes";
import * as publisher from "../messaging/publisher";

const app = express();
app.use(express.json());
app.use("/payments", paymentRoutes);

describe("Payment Routes", () => {
  beforeEach(() => {
    jest.spyOn(publisher, "publishTransaction").mockResolvedValue(undefined);
  });

  it("POST /payments should call publishTransaction", async () => {
    const response = await request(app)
      .post("/payments")
      .send({
        customerId: "c1",
        orderId: "o1",
        amount: "100",
        productId: "p1",
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "Payment Processing (success)" });
    expect(publisher.publishTransaction).toHaveBeenCalledTimes(1);
  });
});
