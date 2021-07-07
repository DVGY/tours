import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

const NotFound: React.FC = () => {
  const { state } = useLocation();

  return (
    <Box h='70vh' marginTop={16}>
      Route Not found
    </Box>
  );
};

export default NotFound;
