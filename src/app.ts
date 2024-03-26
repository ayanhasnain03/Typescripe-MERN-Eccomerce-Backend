import express from "express";
import { connectDb } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
import NodeCache from "node-cache";
import {config} from "dotenv"
import morgan from "morgan"
import cors from "cors"
// importing Routes
import userRoutes from "./routes/user.js"
import productRoute from "./routes/products.js"
import orderRoute from "./routes/order.js"
import paymentRoute from "./routes/payment.js"
import dashbaord from "./routes/stats.js"
import Stripe from "stripe";
config({
    path:"./.env"
})

const port =process.env.PORT || 4000;
const mongoURI=process.env.MONGO_URI || "";
const stripeKey=process.env.STRIPE_KEY || "";
connectDb(mongoURI)
export const stripe = new Stripe(stripeKey)
export const myCache = new NodeCache()
const app = express();
app.use(express.json())
app.use(morgan("dev"))
app.use(cors())

// Routes
app.use("/api/v1/user",userRoutes)
app.use("/api/v1/product",productRoute)
app.use("/api/v1/order",orderRoute)
app.use("/api/v1/payment",paymentRoute)
app.use("/api/v1/dashboard",dashbaord)



app.get("/",(req,res,next)=>{
    res.send("hello")
})
app.use("/uploads",express.static("uploads"))
app.use(errorMiddleware);
app.listen(port,()=>{
    console.log(`server is working on http://localhost:${port}`)
})