import { config } from "dotenv";
import Razorpay from "razorpay";

config();

export const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;

export const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});
