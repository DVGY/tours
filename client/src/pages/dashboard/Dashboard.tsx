import React from 'react';
import { ComingSoon } from '../../components/coming-soon/ComingSoon';
import { Box } from '@chakra-ui/react';

const Dashboard: React.FC = () => {
  return (
    <Box h={'100vh'} display={'flex'} justifyContent={'center'}>
      <ComingSoon />
    </Box>
  );
};

export default Dashboard;
