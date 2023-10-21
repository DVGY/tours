import { FC } from 'react';
import { Button, Flex, Text } from '@chakra-ui/react';
import { MdStar } from 'react-icons/md';
import { Link } from 'react-router-dom';

interface IBookTripProps {
  duration: number;
  price: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  tripId: string;
  name: string;
}

const BookTrip: FC<IBookTripProps> = ({
  price,
  duration,
  ratingsAverage,
  ratingsQuantity,
  tripId,
  name,
}) => {
  return (
    <Flex
      minWidth='100%'
      maxHeight='70px'
      alignSelf='flex-start'
      position={['fixed', 'fixed', 'fixed', 'fixed', 'fixed', 'fixed']}
      bottom={0}
      left={0}
      zIndex='popover'
      display={[
        'inherit',
        'inherit',
        'inherit',
        'inherit',
        'inherit',
        'inherit',
      ]}
      p={{ base: '4', md: '4' }}
      backgroundColor='white'
      alignItems='center'
      justifyContent='center'
      border='1px'
      borderColor='gray.200'
      bgColor='gray.100'
    >
      <Flex
        alignItems='center'
        justifyContent='space-between'
        minWidth={['100%', '100%', '100%', '100%', '7xl']}
      >
        <Flex flexDirection='column' alignItems='flex-start'>
          <Flex justifyContent='center' alignItems='center'>
            <Text fontSize='lg' fontWeight='semibold'>
              &#8377; {price}
            </Text>
            <Text>&nbsp;/&nbsp;{duration} days</Text>
          </Flex>

          <Flex justifyContent='center' alignItems='center'>
            <Text fontSize={['sm', 'md', 'lg']} color='gray.700'>
              <MdStar fill='#38B2AC' />
            </Text>
            <Flex justifyContent='center' alignItems='center' gridGap={1}>
              <Text fontWeight='medium'>{ratingsAverage}</Text>
              <Text fontSize={['sm', 'md', 'lg']} color='gray.900'>
                ({ratingsQuantity} reviews)
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex width={{ lg: '20%' }}>
          <Button
            as={Link}
            to={`/booking-session/${tripId}`}
            state={{ tripId, price, name, duration, ratingsAverage }}
            borderRadius={2}
            variant='solid'
            colorScheme='teal'
            size='lg'
            width='150%'
          >
            Book
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default BookTrip;
