import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import {
    allCoupons,
    applyDiscount,
  createPaymentIntent,
  deleteCoupons,
  newCoupon,
} from "../controllers/payment.js";

const app = express.Router();

app.post("/create",createPaymentIntent)
app.post("/coupon/new",adminOnly,newCoupon);
app.get("/discount",applyDiscount);
app.get("/coupon/all",adminOnly,allCoupons);
app.delete("/coupon/:id",adminOnly,deleteCoupons);


export default app;