// tests/e2e/product.e2e.test.ts
import request from "supertest";
import { app } from "../../src/index";
import Product from "../../src/models/product.model";
import { setupTestDB, teardownTestDB, clearDatabase } from "../setup";

jest.setTimeout(30000);

beforeAll(async () => {
  await setupTestDB();
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await teardownTestDB();
});

describe("E2E Product Service", () => {
  it("should return a seeded product", async () => {
    const product = await Product.create({ name: "Laptop", price: 1000 });

    const res = await request(app).get(`/products/${product._id}`);

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Laptop");
    expect(res.body.price).toBe(1000);
  });

  it("should return 404 for missing product", async () => {
    const res = await request(app).get(`/products/${new Product()._id}`);
    expect(res.status).toBe(404);
  });
});
