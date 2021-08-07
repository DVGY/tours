import React, { FC, Fragment } from 'react';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import { Flex, Text } from '@chakra-ui/react';

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
      <Text>Card Number </Text>
      <CardNumberElement options={CARD_ELEMENT_OPTIONS} />;
      <Flex gridGap={3} justifyContent='space-between'>
        <Flex
          flexDirection='column'
          flexBasis='45%'
          flexGrow={0}
          flexShrink={0}
        >
          <Text>Expiry Date </Text>
          <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />;
        </Flex>
        <Flex
          flexDirection='column'
          flexBasis='45%'
          flexGrow={0}
          flexShrink={0}
        >
          <Text>CVV </Text>
          <CardCvcElement options={CARD_ELEMENT_OPTIONS} />;
        </Flex>
      </Flex>
    </Fragment>
  );
};

export default CardSection;
