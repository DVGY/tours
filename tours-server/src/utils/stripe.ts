import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY Not defined');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
  typescript: true,
});

const getPaymentIntent = async (
  amount: number
): Promise<Stripe.Response<Stripe.PaymentIntent>> => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: 'INR',
  });
  return paymentIntent;
};

export { stripe, getPaymentIntent };
