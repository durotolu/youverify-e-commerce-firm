import Order, { OrderStatus } from "../src/models/order.model";

describe("Order Model", () => {
  it("should create an order with default status 'pending'", () => {
    const order = new Order({ customerId: "cust1", productId: "prod1", amount: 100 });
    expect(order.customerId).toBe("cust1");
    expect(order.productId).toBe("prod1");
    expect(order.amount).toBe(100);
    expect(order.status).toBe(OrderStatus.PENDING);
  });

  it("should throw validation error when missing required fields", async () => {
    const order = new Order({});
    let error: any;
    try {
      await order.validate();
    } catch (e) {
      error = e;
    }
    expect(error).toBeDefined();
    expect(error.errors.customerId).toBeDefined();
    expect(error.errors.productId).toBeDefined();
    expect(error.errors.amount).toBeDefined();
  });
});
