import React, { FC } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { PaymentMethodResult } from '@stripe/stripe-js';

import CardSection from './CardSection';
import { Box, Button } from '@chakra-ui/react';

const CheckoutForm: FC = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const card = elements.getElement(CardElement);

    const result = card
      ? await stripe.createPaymentMethod({
          type: 'card',
          card,
          billing_details: {
            // Include any additional collected billing details.
            name: 'Jenny Rosen',
          },
        })
      : null;
    console.log(result);
    //   stripePaymentMethodHandler(result);
  };
  return (
    <Box px={4} py={4}>
      <form onSubmit={handleSubmit}>
        <CardSection />
        <Button
          borderRadius={0}
          type='submit'
          variant='solid'
          colorScheme='teal'
          width='full'
        >
          Pay
        </Button>
      </form>
    </Box>
  );
};

function stripePaymentMethodHandler(result: PaymentMethodResult) {
  if (result.error) {
    // Show error in payment form
    console.log('Payment Intent not successfull');
  } else {
    console.log('Payment Intent successful');
  }
}

export default CheckoutForm;
