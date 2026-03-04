import { publishTransaction } from "../messaging/publisher";
import amqp from "amqplib";

// Mock amqplib
jest.mock("amqplib");

describe("publishTransaction", () => {
  it("should send a message to the queue", async () => {
    const sendToQueueMock = jest.fn();
    const assertQueueMock = jest.fn();

    (amqp.connect as jest.Mock).mockResolvedValue({
      createChannel: jest.fn().mockResolvedValue({
        assertQueue: assertQueueMock,
        sendToQueue: sendToQueueMock,
      }),
    });

    const data = { customerId: "c1", orderId: "o1", amount: "100", productId: "p1" };
    await publishTransaction(data);

    expect(assertQueueMock).toHaveBeenCalledWith("transactions");
    expect(sendToQueueMock).toHaveBeenCalledWith(
      "transactions",
      Buffer.from(JSON.stringify(data))
    );
  });
});
