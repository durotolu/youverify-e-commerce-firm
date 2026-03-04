import { Router } from "express";
import Product from "../models/product.model";

const router = Router();

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: "Invalid product ID" });
  }
});

export default router;
