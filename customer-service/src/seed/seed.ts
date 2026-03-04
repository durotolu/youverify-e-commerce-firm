import Customer from "../models/customer.model";

/**
 * Seeds the database with a default customer if none exist.
 */
export const seedCustomer = async (): Promise<void> => {
  const exists = await Customer.findOne();

  if (!exists) {
    await Customer.create({
      name: "John Doe",
      email: "john@test.com"
    });

    console.log("Customer seeded");
  }
};
