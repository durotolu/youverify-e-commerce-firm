import { Router } from "express";
import { publishTransaction } from "../messaging/publisher";

const router = Router();

router.post("/", async (req, res) => {
  const { customerId, orderId, amount, productId } = req.body;
  await publishTransaction({
    customerId,
    orderId,
    amount,
    productId
  });

  res.json({ status: "Payment Processing (success)" });
});

export default router;
