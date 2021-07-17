import React from 'react';
import { Flex, Spinner, Text } from '@chakra-ui/react';

const Loading: React.FC = () => {
  return (
    <Flex
      flexDirection='column'
      justifyContent='center'
      h='100vh'
      alignItems='center'
    >
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
      <Text fontSize={['xl', '3xl']} textAlign='center' color='blue.500'>
        Loading
      </Text>
    </Flex>
  );
};

export default Loading;
