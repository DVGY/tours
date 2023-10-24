import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

interface IErrorProps {
  error?: string;
  statusCode?: number;
  message?: string;
  stack?: string;
}
const ShowError: React.FC<IErrorProps> = ({ message }) => {
  return (
    <Flex
      boxShadow='lg'
      justifyContent='center'
      // h='100vh'
      mt='10%'
      alignItems='stretch'
      p='4'
      // overflow='scroll'
    >
      <Text color='red.400' fontSize='lg'>
        Error: {message}
      </Text>
    </Flex>
  );
};

export default ShowError;
