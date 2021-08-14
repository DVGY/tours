import React, { FC } from 'react';
import { Flex, Image, Text, VStack, Button } from '@chakra-ui/react';
import { MdFavoriteBorder, MdStar } from 'react-icons/md';
import { Link } from 'react-router-dom';
import fallbackImg from '../../assets/placeholder.jpg';

export interface ITripCardProps {
  _id: string;
  name: string;
  duration: number;
  price: number;
  difficulty: string;
  summary: string;
  imageCover: string;
  ratingsAverage: number;
  ratingsQuantity: number;
}

type ImageCoverProps = Pick<ITripCardProps, 'imageCover'>;

const ImageCover: React.FC<ImageCoverProps> = ({ imageCover }) => {
  const mediaProps = [
    '(max-width: 743px)',
    '(min-width: 743.1px) and (max-width: 1127px)',
    '(min-width: 1127.1px) and (max-width: 1439px)',
    '(min-width: 1439.1px)',
  ];
  const baseUrl = 'https://a0.muscache.com/im/pictures/';

  const size480px = 'im_w=480 1x';
  const size720px = 'im_w=720';
  const sourceElementProps = mediaProps.map((responsiveSize) => {
    const srcSetProps = `${baseUrl}${imageCover}?${size480px}`;

    return {
      srcSetProps,
      responsiveSize,
    };
  });
  return (
    <Flex h='100%'>
      <picture>
        {sourceElementProps.map(({ srcSetProps, responsiveSize }, index) => {
          return (
            <source key={index} srcSet={srcSetProps} media={responsiveSize} />
          );
        })}

        <Image
          src={`${baseUrl}${imageCover}?${size720px}`}
          data-original-uri={`${baseUrl}${imageCover}?${size720px}`}
          alt={`trip`}
          roundedTop='lg'
          fallback={ImageFallback()}
          maxWidth='100%'
          display='block'
          h='100%'
        />
      </picture>
    </Flex>
  );
};

const ImageFallback = () => {
  return (
    <Flex>
      <Image src={fallbackImg} alt={`image-load-fail`} roundedTop='lg' />
    </Flex>
  );
};

const TripCard: FC<ITripCardProps> = ({
  _id: tripId,
  name,
  duration,
  price,
  difficulty,
  summary,
  imageCover,
  ratingsAverage,
  ratingsQuantity,
}) => {
  return (
    <Flex
      flexDirection='column'
      justifyContent='space-between'
      alignItems='start'
      boxShadow='xl'
      pb={2}
      bgColor='white'
      h='100%'
    >
      <ImageCover imageCover={imageCover} />
      <VStack spacing={[4]} px={[4]} pt={[4]} alignSelf='stretch'>
        <Flex justifyContent='space-between' alignItems='center' w='100%'>
          <Text fontSize='lg' color='gray.900'>
            {name}
          </Text>
          <Text fontSize='xl'>
            <MdFavoriteBorder color='#38B2AC' />
          </Text>
        </Flex>
        <Flex justifyContent='start' alignItems='center' w='100%'>
          <Text fontSize='xs' textAlign='start' color='gray.400'>
            {summary}
          </Text>
        </Flex>
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
