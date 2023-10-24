import { Box } from '@chakra-ui/react';
import { ComingSoon } from '../../components/coming-soon/ComingSoon';

const BookingsPage = () => {
  return (
    <Box h={'100vh'} display={'flex'} justifyContent={'center'}>
      <ComingSoon />;
    </Box>
  );
};

export default BookingsPage;
