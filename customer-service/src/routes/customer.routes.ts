import { Router } from "express";
import Customer from "../models/customer.model";

const router = Router();

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  res.json(customer);
});

export default router;
