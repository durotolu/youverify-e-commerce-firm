import { Router } from "express";
import axios from "axios";
import Order from "../models/order.model";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { customerId, productId } = req.body;

    if (!customerId || !productId ) {
      return res.status(400).json({ error: "Invalid order data" });
    }

    const productRes = await axios.get(
      `http://product-service:3002/products/${productId}`
    );

    const amount = productRes.data.price;

    const order = await Order.create({
      customerId,
      productId,
      amount,
      status: "pending"
    });

    const paymentResponse = await axios.post(
      "http://payment-service:3004/payments",
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
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(message);
    res.status(500).json({ message });
  }
});

export default router;
