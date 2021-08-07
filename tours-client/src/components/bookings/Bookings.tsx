import React, { FC } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Box, Text } from '@chakra-ui/react';

import CheckoutForm from './CheckoutForm';

import './style.css';

const stripePromise = loadStripe(
  'pk_test_51IhbXISG1qmm1Y3dE9l2HV0HtZbWNV7iEcnQKelc0TIKlwzIX82HGiW9jHsdTlgyy8O7suewjCoxKj93ca8wjcVe00C0LMS29j'
);

const Bookings: FC = () => {
  console.log('dasfads');
  return (
    <Elements stripe={stripePromise}>
      <Box
        display='flex'
        flexDirection='column'
        h='100vh'
        px={{ base: '0', md: '4' }}
        marginTop={16}
        py={[10]}
        alignItems='center'
        mx='auto'
        bgColor='gray.200'
      >
        <Text
          fontSize={['lg', 'lg', '2xl']}
          fontWeight={['semibold', 'medium']}
          alignSelf='center'
        >
          {' '}
          Card Details
        </Text>
        <CheckoutForm />
      </Box>
    </Elements>
  );
};

export default Bookings;
