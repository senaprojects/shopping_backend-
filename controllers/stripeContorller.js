
import stripePackage from "stripe";

const KEY = process.env.STRIPE_KEY;
const stripe = stripePackage(KEY);
// const stripeSrever = stripe(KEY);
export const stripeRoute =async (req, res) => {
  try {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd", // Replace with your desired currency code
    });
    res.json({ clientSecret: paymentIntent.client_secret ,message:"success"});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
