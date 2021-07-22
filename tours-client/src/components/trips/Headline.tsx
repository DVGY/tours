import React, { FC } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { MdFavoriteBorder, MdStar, MdShare } from 'react-icons/md';

interface IHealineProps {
  name: string;
  ratingsAverage: number;
  ratingsQuantity: number;
}

const Headline: FC<IHealineProps> = ({
  name,
  ratingsAverage,
  ratingsQuantity,
}) => {
  return (
    <Flex
      flexDirection='column'
      flexBasis='100%'
      flexGrow='unset'
      flexShrink='unset'
    >
      <Text
        fontSize={['md', 'lg', '2xl']}
        fontWeight={['normal', 'semibold', 'medium']}
      >
        {name}
      </Text>

      <Flex justifyContent='space-between'>
        <Flex justifyContent='center' alignItems='center'>
          <Text fontSize={['sm', 'md', 'lg']} color='gray.700'>
            <MdStar fill='#38B2AC' />
          </Text>
          <Text fontSize={['sm', 'md', 'lg']} color='gray.900'>
            <strong> {ratingsAverage}</strong> ({ratingsQuantity} reviews)
          </Text>
        </Flex>
        <Flex justifyContent='center' alignItems='center'>
          <Text fontSize={['sm', 'md', 'lg']}>
            <MdShare color='#38B2AC' />
          </Text>
          <Box> &nbsp;</Box>
          <Text fontSize={['sm', 'md', 'lg']} as='u' color='gray.900'>
            Share
          </Text>

          <Box mx='1.5'> &nbsp;</Box>

          <Text fontSize={['sm', 'md', 'lg']}>
            <MdFavoriteBorder color='#38B2AC' />
          </Text>
          <Box> &nbsp;</Box>
          <Text fontSize={['sm', 'md', 'lg']} as='u' color='gray.900'>
            Save
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Headline;
