import express from "express";
import cors from "cors"
import notFound from "./app/middlewares/notFound";
import globalError from "./app/middlewares/globalError";
import router from "./app/routes";
import NodeCache from "node-cache"
import Stripe from "stripe";
import config from "./app/config";

const app = express()

// instance
export const myCache = new NodeCache();
export const stripeInstance = new Stripe(config.STRIPE_KEY as string)


// helper middlewares
app.use(cors({ origin: '*' }));
app.use(express.json())

// routes
app.use("/api/v1", router)

// testing route
app.get("/", (req, res) => {
  res.json({
    message: "Processing",
    project: "E-commerce server site."
  })
})

// application middlewares
app.use(globalError)
app.use(notFound)


export default app