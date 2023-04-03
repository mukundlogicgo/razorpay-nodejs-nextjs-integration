import express from "express";
import cors from "cors";
import shortid from "shortid";

import { RAZORPAY_KEY_ID, razorpay } from "./config/default.config.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/razorpay/id", async (req, res) => {
  res.send({
    RAZORPAY_KEY_ID,
  });
});

app.post("/api/razorpay/order", async (req, res) => {
  // Create an order -> generate the OrderID -> Send it to the Front-end
  const payment_capture = 1;
  const amount = 499;
  const currency = "INR";

  const options = {
    amount: (amount * 100).toString(),
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    res.send({
      order_id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Unable to create order.",
    });
  }
});

app.listen(5000, () => console.log("Server is running on 5000"));
