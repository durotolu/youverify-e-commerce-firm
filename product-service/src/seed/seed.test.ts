import Product from "../../src/models/product.model";
import { seedProducts } from "../../src/seed/seed";
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

describe("seedProducts", () => {
  it("should create products if none exists", async () => {
    await seedProducts();
    const product = await Product.findOne({ name: "Laptop" });
    expect(product).not.toBeNull();
  });

  it("should not duplicate products on repeated calls", async () => {
    await seedProducts();
    const products = await Product.find({ name: "Laptop" });
    expect(products.length).toBe(1);
  });
});
