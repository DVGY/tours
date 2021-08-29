import React, { FC } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Box, Text } from '@chakra-ui/react';

import CheckoutForm from './CheckoutForm';

import './style.css';
import { useLocation } from 'react-router';

const stripePromise = loadStripe(
  'pk_test_51IhbXISG1qmm1Y3dE9l2HV0HtZbWNV7iEcnQKelc0TIKlwzIX82HGiW9jHsdTlgyy8O7suewjCoxKj93ca8wjcVe00C0LMS29j'
);

type LocationState = {
  tripId: string;
  price: number;
};

const Bookings: FC = () => {
  const { state } = useLocation<LocationState>();
  const { tripId, price } = state;

  return (
    <Elements stripe={stripePromise}>
      <Box
        display='flex'
        flexDirection='column'
        h='100vh'
        px={{ base: '0', md: '4' }}
        alignItems='center'
        mx='auto'
        bgColor='gray.200'
        marginTop={[16, 16, 16, 20, 20, 20]}
        py={[10, 10, 10, 16, 20, 20]}
        maxWidth='700px'
      >
        <Text
          fontSize={['3xl', '3xl', '3xl', '3xl', '4xl', '4xl']}
          fontWeight={['semibold', 'medium']}
          alignSelf='center'
        >
          {' '}
          Card Details
        </Text>
        <CheckoutForm tripId={tripId} price={price} />
      </Box>
    </Elements>
  );
};

export default Bookings;
