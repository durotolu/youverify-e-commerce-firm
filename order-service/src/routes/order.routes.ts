import { Router } from "express";
import axios from "axios";
import Order from "../models/order.model";

const router = Router();

router.post("/", async (req, res) => {
  const { customerId, productId } = req.body;

  const productRes = await axios.get(
    `http://product-service:3002/products/${productId}`
  );

  const amount = productRes.data.price;

  if (!customerId || !productId || !amount) {
    return res.status(400).json({ error: "Invalid order data" });
  }

  const order = await Order.create({
    customerId,
    productId,
    amount
  });

  const paymentResponse = await axios.post(
    "http://payment-service:3004/pay",
    {
      customerId,
      orderId: order._id,
      productId,
      amount
    }
  );

  res.json({
    customerId,
    orderId: order._id,
    productId,
    orderStatus: order.status,
    paymentStatus: paymentResponse.data.status
  });
});

export default router;
