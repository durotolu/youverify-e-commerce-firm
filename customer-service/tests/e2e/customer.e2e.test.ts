import request from "supertest";
import { app } from "../../src/index";
import Customer from "../../src/models/customer.model";
import { setupTestDB, teardownTestDB, clearDatabase } from '../../tests/setup';

describe("E2E Customer Service", () => {
  let customerId: string;

  beforeAll(async () => {
    await setupTestDB();
    await Customer.deleteMany({});

    const customer = await Customer.create({
      name: "Jane Doe",
      email: "jane@test.com",
    });

    customerId = customer._id.toString();
  });
  
  afterEach(async () => {
    await clearDatabase();
  });
  
  afterAll(async () => {
    await teardownTestDB();
  });

  test("should get a customer by ID", async () => {
    const res = await request(app).get(`/customers/${customerId}`);

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Jane Doe");
  });
});