import mongoose from "mongoose";
import amqp from "amqplib";
import { handleTransaction } from "./worker/transactionHandler";

async function connectRabbitMQ(retries = 10) {
  while (retries) {
    try {
      const conn = await amqp.connect("amqp://rabbitmq");
      console.log("RabbitMQ Connected");
      return conn;
    } catch (err) {
      console.log("RabbitMQ not ready, retrying in 5s...");
      retries--;
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
  throw new Error("RabbitMQ connection failed");
}

async function start() {
  const mongoURI =
    process.env.MONGO_URI ||
    process.env.MONGO_URI_TRANSACTION_DOCKER ||
    "mongodb://mongo:27017/transactiondb";

  await mongoose.connect(mongoURI);
  console.log("Transaction DB Connected");

  const conn = await connectRabbitMQ();
  const channel = await conn.createChannel();

  const queue = "transactions";
  await channel.assertQueue(queue);

  console.log("Worker waiting...");

  channel.consume(queue, async (msg) => {
    if (!msg) return;

    await handleTransaction(msg.content);

    channel.ack(msg);
  });
}

start().catch(console.error);
