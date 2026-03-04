import Customer from "../../src/models/customer.model";

describe("Customer Model", () => {
  it("should have required fields", () => {
    const customer = new Customer({ name: "Alice", email: "alice@test.com" });
    expect(customer.name).toBe("Alice");
    expect(customer.email).toBe("alice@test.com");
  });

  it("should throw validation error when missing fields", async () => {
    const customer = new Customer({});
    let error: any;
    try {
      await customer.validate();
    } catch (e) {
      error = e;
    }
    expect(error).toBeDefined();
    expect(error.errors.name).toBeDefined();
    expect(error.errors.email).toBeDefined();
  });
});
