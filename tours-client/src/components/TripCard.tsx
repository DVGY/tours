import React, { FC } from 'react';
import { Flex, Image, Text, VStack, Button } from '@chakra-ui/react';
import devImg from '../assets/dev-img/dev.jpeg';
import { MdFavoriteBorder, MdStar } from 'react-icons/md';
import { Link } from 'react-router-dom';

interface ITripCardProps {
  name: string;
  duration: number;
  price: number;
  difficulty: string;
  summary: string;
  imageCover: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  tripId: string;
}
const TripCard: FC<ITripCardProps> = ({
  name,
  duration,
  price,
  difficulty,
  summary,
  imageCover,
  ratingsAverage,
  ratingsQuantity,
  tripId,
}) => {
  return (
    <Flex flexDirection='column' alignItems='start' boxShadow='xl' pb={2}>
      <Image src={devImg} alt={`trip`} roundedTop='lg' />
      <VStack spacing={3} px={2} pt={2}>
        <Flex justifyContent='space-between' alignItems='center' w='100%'>
          <Text fontSize='lg' color='gray.900'>
            {name}
          </Text>
          <Text fontSize='xl'>
            <MdFavoriteBorder color='#38B2AC' />
          </Text>
        </Flex>
        <Text fontSize='xs' textAlign='start' color='gray.400'>
          {summary}
        </Text>
        <Flex justifyContent='space-between' alignItems='center' w='100%'>
          <Text fontSize='xs' color='gray.700'>
            <strong> &#8377; {price}</strong>
          </Text>
          <Text fontSize='xs' color='gray.700'>
            {duration} Days
          </Text>
        </Flex>

        <Flex justifyContent='space-between' alignItems='center' w='100%'>
          <Flex alignItems='center'>
            <Text fontSize='xs' color='gray.700'>
              <MdStar fill='#38B2AC' />
            </Text>
            <Text fontSize='xs' color='gray.900'>
              <strong> {ratingsAverage}</strong> ({ratingsQuantity} reviews)
            </Text>
          </Flex>
          <Text fontSize='xs' color='gray.900'>
            {difficulty}
          </Text>
        </Flex>
        <Button
          as={Link}
          to={`/trips/${tripId}`}
          borderRadius={0}
          variant='solid'
          colorScheme='teal'
          width='full'
        >
          Details
        </Button>
      </VStack>
    </Flex>
  );
};

export default TripCard;
