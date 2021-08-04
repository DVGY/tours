import React, { FC } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import './style.css';
import CardSection from './CardSection';
import { Box, Text } from '@chakra-ui/react';

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
        px={{ base: '3', md: '4' }}
        marginTop={16}
        py={[10]}
        alignItems='center'
        w={['100%', '100%', '100%', '60%']}
        mx='auto'
      >
        <Text
          fontSize={['md', 'lg', '2xl']}
          fontWeight={['semibold', 'medium']}
          alignSelf='start'
        >
          {' '}
          Card Details
        </Text>
        <CardSection />
      </Box>
    </Elements>
  );
};

export default Bookings;
