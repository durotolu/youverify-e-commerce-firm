import Customer from "../src/models/customer.model";
import { seedCustomer } from "../src/seed/seed";
import { setupTestDB, teardownTestDB, clearDatabase } from './setup';

beforeAll(async () => {
  await setupTestDB();
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await teardownTestDB();
});

describe("seedCustomer", () => {
  it("should create a customer if none exists", async () => {
    await seedCustomer();
    const customer = await Customer.findOne({ name: "John Doe" });
    expect(customer).not.toBeNull();
  });

  it("should not duplicate customers on repeated calls", async () => {
    await seedCustomer();
    const customers = await Customer.find({ name: "John Doe" });
    expect(customers.length).toBe(1);
  });
});
