import { FC } from 'react';
import { Box } from '@chakra-ui/react';
import { ComingSoon } from '../coming-soon/ComingSoon';

const UserSettings: FC = () => {
  return (
    <Box
      h='100vh'
      display={'flex'}
      justifyContent={'center'}
      className='random'
    >
      <ComingSoon />
    </Box>
  );
};

export default UserSettings;
