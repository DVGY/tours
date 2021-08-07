import React, { FC } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { PaymentMethodResult } from '@stripe/stripe-js';
import Axios from '../../utils/Axios';

import CardSection from './CardSection';
import { Box, Button, Flex, Text } from '@chakra-ui/react';

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

    try {
      const resp = await Axios.post('/bookings/payment-intent', {
        amount: 200,
      });
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box px={4} py={4} w={['100%', '100%', '100%', '60%']}>
      <form onSubmit={handleSubmit}>
        <Flex flexDirection='column'>
          <CardSection />
          <Button
            type='submit'
            variant='solid'
            colorScheme='teal'
            width='full'
            mt={3}
            minHeight='60px'
          >
            <Text
              fontSize={['2xl']}
              fontWeight={['semibold', 'medium']}
              alignSelf='center'
              p={3}
            >
              {' '}
              Pay
            </Text>
          </Button>
        </Flex>
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
