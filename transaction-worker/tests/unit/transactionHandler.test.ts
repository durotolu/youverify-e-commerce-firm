import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Transaction from "../../src/models/transaction.model";
import { handleTransaction } from "../../src/worker/transactionHandler";

jest.mock("amqplib", () => ({
  connect: jest.fn().mockResolvedValue({
    createChannel: jest.fn().mockResolvedValue({
      assertQueue: jest.fn(),
      consume: jest.fn(),
      sendToQueue: jest.fn(),
      ack: jest.fn(),
    }),
  }),
}));

let mongo: MongoMemoryServer;

jest.setTimeout(20000);

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

afterEach(async () => {
  await Transaction.deleteMany({});
});

describe("handleTransaction", () => {
  it("should save transaction to DB", async () => {
    const msg = Buffer.from(
      JSON.stringify({ customerId: "c1", orderId: "o1", productId: "p1", amount: 100 })
    );

    const transaction = await handleTransaction(msg);

    expect(transaction.customerId).toBe("c1");
    expect(await Transaction.countDocuments()).toBe(1);
  });
});
