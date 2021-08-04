import React, { FC, Fragment } from 'react';
import {
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  PaymentRequestButtonElement,
} from '@stripe/react-stripe-js';
import { Box } from '@chakra-ui/react';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

const CardSection: FC = () => {
  return (
    <Fragment>
      <CardNumberElement options={CARD_ELEMENT_OPTIONS} />;
      <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />;
      <CardCvcElement options={CARD_ELEMENT_OPTIONS} />;
    </Fragment>
  );
};

export default CardSection;
