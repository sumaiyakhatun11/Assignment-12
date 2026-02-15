let stripe = null;

export const getStripe = () => {
  if (!stripe) {
    const { default: Stripe } = require("stripe");
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      throw new Error("Missing STRIPE_SECRET_KEY");
    }
    stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2024-06-20",
    });
  }
  return stripe;
};
