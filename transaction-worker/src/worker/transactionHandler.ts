import Transaction from "../models/transaction.model";

export const handleTransaction = async (msg: Buffer) => {
  const data = JSON.parse(msg.toString());
  const transaction = await Transaction.create(data);
  return transaction;
};
