import mongoose from "mongoose";
import amqp from "amqplib";
import Transaction from "./models/transaction.model";

async function start() {
  await mongoose.connect(
    `mongodb://mongo:27017/transactiondb`
  );

  console.log("Transaction DB Connected");

  const conn = await amqp.connect("amqp://rabbitmq");
  console.log("RabbitMQ Connected");

  const channel = await conn.createChannel();

  const queue = "transactions";
  await channel.assertQueue(queue);

  console.log("Worker waiting...");

  channel.consume(queue, async (msg) => {
    if (!msg) return;

    const data = JSON.parse(msg.content.toString());

    await Transaction.create(data);

    console.log("Transaction saved");

    channel.ack(msg);
  });
}

start();
