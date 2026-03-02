import Product from "../models/product.model";

export const seedProducts = async () => {
  const count = await Product.countDocuments();

  if (!count) {
    await Product.insertMany([
      { name: "Laptop", price: 1000 },
      { name: "Phone", price: 500 },
    ]);

    console.log("Products seeded");
  }
};
