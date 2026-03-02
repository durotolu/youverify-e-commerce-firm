import { Router } from "express";
import Product from "../models/product.model";

const router = Router();

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

export default router;
