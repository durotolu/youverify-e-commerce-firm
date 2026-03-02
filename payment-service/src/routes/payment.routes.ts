import { Router } from "express";
import { publishTransaction } from "../messaging/publisher";

const router = Router();

router.post("/pay", async (req, res) => {
  await publishTransaction(req.body);

  res.json({ status: "Payment Processing" });
});

export default router;
