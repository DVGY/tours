import React from 'react';
import { Flex, Spinner } from '@chakra-ui/react';

const Loading: React.FC = () => {
  return (
    <Flex justifyContent='center' h='100vh' mt='10%' alignItems='stretch'>
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    </Flex>
  );
};

export default Loading;
