import React, { FC, useState } from 'react';
import { Button, Flex, Text } from '@chakra-ui/react';
import {
  useStripe,
  useElements,
  CardNumberElement,
} from '@stripe/react-stripe-js';
import { StripeError, PaymentIntentResult } from '@stripe/stripe-js';
import {
  IoMdCheckmarkCircleOutline,
  IoMdCloseCircleOutline,
} from 'react-icons/io';

import Axios from '../../utils/Axios';
import CardSection from './CardSection';
import Loading from '../app-state/Loading';
import { localStorageProxy } from '../../utils/localStorageProxy';

interface ICheckoutForm {
  tripId: string;
  price: number;
}

const CheckoutForm: FC<ICheckoutForm> = ({ tripId, price }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<StripeError | null>(null);
  const [paymentStatus, setPaymentStatus] =
    useState<PaymentIntentResult | null>(null);
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

    const card = elements.getElement(CardNumberElement);

    if (!card) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setPaymentStatus(null);
      const authtoken = localStorageProxy.getItem('authtoken');
      const token = () => (authtoken ? `Bearer ${authtoken}` : null);
      const responsePaymentIntent = await Axios({
        method: 'POST',
        url: '/bookings/payment-intent',
        headers: {
          Authorization: token(),
        },
        data: {
          tripId,
          price,
        },
      });

      console.log(responsePaymentIntent);
      const client_secret: string = responsePaymentIntent.data.client_secret;

      const responsePaymentResult = await stripe.confirmCardPayment(
        client_secret,
        {
          payment_method: {
            card,
          },
          return_url: 'http://localhost:3000/trips?success=true',
        }
      );

      setPaymentStatus(responsePaymentResult);

      if (responsePaymentResult.error) {
        setError(responsePaymentResult?.error);
      }
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
      console.log(error);
    }
  };

  const PaymentError = () => {
    if (error) {
      return (
        <Flex alignItems='center'>
          <Text
            fontSize={['md', 'md', 'lg', 'lg', 'xl', '2xl']}
            fontWeight={['semibold', 'medium']}
            alignSelf='center'
            color='red.400'
          >
            <IoMdCloseCircleOutline />
          </Text>
          <Text
            fontSize={['md', 'md', 'lg', 'lg', 'xl', '2xl']}
            fontWeight={['semibold', 'medium']}
            alignSelf='center'
            color='red.400'
          >
            Error Processing Payment
          </Text>
        </Flex>
      );
    }
    return null;
  };

  const ProcessingPayment = () => {
    if (loading) {
      return <Loading message='Processsing Payment. Do not refresh page' />;
    }
    return null;
  };

  const PaymentSuccess = () => {
    if (paymentStatus?.paymentIntent) {
      return (
        <Flex alignItems='center'>
          <Text
            fontSize={['md', 'md', 'lg', 'lg', 'xl', '2xl']}
            fontWeight={['semibold', 'medium']}
            alignSelf='center'
            color='green'
          >
            <IoMdCheckmarkCircleOutline />
          </Text>
          <Text
            fontSize={['md', 'md', 'lg', 'lg', 'xl', '2xl']}
            fontWeight={['semibold', 'medium']}
            alignSelf='center'
            color='green'
          >
            Payment Successfull
          </Text>
        </Flex>
      );
    }

    return null;
  };

  return (
    <Flex flexDirection='column' px={4} py={4} w='100%' gridGap={3}>
      <form onSubmit={handleSubmit}>
        <Flex flexDirection='column'>
          <CardSection />
          <Button
            disabled={!stripe || loading}
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
      <ProcessingPayment />
      <PaymentSuccess />
      <PaymentError />
    </Flex>
  );
};

export default CheckoutForm;
