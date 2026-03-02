import amqp from "amqplib";

export const publishTransaction = async (data: any) => {
  const conn = await amqp.connect("amqp://rabbitmq");
  const channel = await conn.createChannel();

  const queue = "transactions";

  await channel.assertQueue(queue);

  channel.sendToQueue(
    queue,
    Buffer.from(JSON.stringify(data))
  );

  console.log("Message sent to queue");
};