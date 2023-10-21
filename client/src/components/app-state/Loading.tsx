import React from 'react';
import { Flex, Spinner, Text } from '@chakra-ui/react';

interface ILoadingProps {
  message?: string;
}

type LoadingMessage = Pick<ILoadingProps, 'message'>;

const LoadingMessage: React.FC<LoadingMessage> = ({ message }) => {
  if (message) {
    return (
      <Text fontSize={['xl', '3xl']} textAlign='center' color='blue.500'>
        {message}
      </Text>
    );
  }
  return (
    <Text fontSize={['xl', '3xl']} textAlign='center' color='blue.500'>
      Loading
    </Text>
  );
};

const Loading: React.FC<ILoadingProps> = ({ message }) => {
  return (
    <Flex flexDirection='column' justifyContent='center' alignItems='center'>
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />

      <LoadingMessage message={message} />
    </Flex>
  );
};

export default Loading;
