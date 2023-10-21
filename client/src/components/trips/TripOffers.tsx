import { Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';

const TripOffers: FC = () => {
  return (
    <Flex
      order={9}
      gridGap={4}
      px={{ base: '4', md: '4', lg: '0' }}
      flexDirection='column'
      alignItems='flex-start'
    >
      <Text fontSize={['md', 'lg', '2xl']} fontWeight={['semibold', 'medium']}>
        Trip Offers and Amenities
      </Text>
    </Flex>
  );
};

export default TripOffers;
