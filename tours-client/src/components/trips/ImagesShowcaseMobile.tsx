import React, { FC } from 'react';
import { Flex } from '@chakra-ui/react';

import Carousel from '../carousel/Carousel';
import { IImageShowcaseProps } from './ImagesShowcase';

const ImagesShowcaseMobile: FC<IImageShowcaseProps> = ({ images }) => {
  return (
    <Flex
      display={['block', 'block', 'inherit', 'none', 'none', 'none']}
      marginTop={{ base: '16', sm: '0', md: '0' }}
    >
      <Carousel images={images} />
    </Flex>
  );
};

export default ImagesShowcaseMobile;
