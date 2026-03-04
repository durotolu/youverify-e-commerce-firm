import Product from "../../src/models/product.model";

describe("Product Model", () => {
  it("should create a product with required fields", () => {
    const product = new Product({ name: "Laptop", price: 1000 });
    expect(product.name).toBe("Laptop");
    expect(product.price).toBe(1000);
  });

  it("should throw validation error when fields are missing", async () => {
    const product = new Product({});
    let error: any;
    try {
      await product.validate();
    } catch (e) {
      error = e;
    }

    expect(error).toBeDefined();
    expect(error.errors.name).toBeDefined();
    expect(error.errors.price).toBeDefined();
  });
});
