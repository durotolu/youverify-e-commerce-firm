import Customer from "../models/customer.model";

export const seedCustomer = async () => {
  const exists = await Customer.findOne();

  if (!exists) {
    await Customer.create({
      name: "John Doe",
      email: "john@test.com"
    });

    console.log("Customer seeded");
  }
};
