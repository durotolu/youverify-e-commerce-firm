import { Router } from "express";
import Customer from "../models/customer.model";
const mongoose = require('mongoose');

const router = Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid customer ID' });
  }

  const customer = await Customer.findById(id);
  if (!customer) return res.status(404).json({ error: 'Customer not found' });

  res.json(customer);
});

export default router;
