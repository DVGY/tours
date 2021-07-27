import React, { FC } from 'react';
import { Button, Flex, Text } from '@chakra-ui/react';
import { MdStar } from 'react-icons/md';

interface IBookTripProps {
  duration: number;
  price: number;
  ratingsAverage: number;
  ratingsQuantity: number;
}

const BookTrip: FC<IBookTripProps> = ({
  price,
  duration,
  ratingsAverage,
  ratingsQuantity,
}) => {
  return (
    <Flex
      minWidth='100%'
      maxHeight='70px'
      alignSelf='flex-start'
      position='fixed'
      bottom={0}
      left={0}
      zIndex='popover'
      display={['inherit', 'inherit', 'inherit', 'none', 'none', 'none']}
      justifyContent='space-between'
      p={{ base: '4', md: '4' }}
      backgroundColor='white'
      alignItems='center'
      border='1px'
      borderColor='gray.200'
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
      <Flex>
        <Button
          //   as={Link}
          //   to={`/trips/${tripId}`}
          borderRadius={2}
          variant='solid'
          colorScheme='teal'
          size='lg'
          width='full'
        >
          Book
        </Button>
      </Flex>
    </Flex>
  );
};

export default BookTrip;
