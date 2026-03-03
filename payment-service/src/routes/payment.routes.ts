import { Router } from "express";
import { publishTransaction } from "../messaging/publisher";

const router = Router();

router.post("/pay", async (req, res) => {
  const { customerId, orderId, amount, productId } = req.body;
  await publishTransaction({
    customerId,
    orderId,
    amount,
    productId
  });

  res.json({ status: "Payment Processing" });
});

export default router;
