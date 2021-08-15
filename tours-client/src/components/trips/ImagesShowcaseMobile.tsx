import React, { FC } from 'react';
import { Flex } from '@chakra-ui/react';

import Carousel from '../carousel/Carousel';
import { IImageShowcaseProps } from './ImagesShowcase';

const imagesUrl = [
  'https://a0.muscache.com/im/pictures/6c0e09d9-2537-4c2a-9180-4f14e22a1996.jpg?im_w=1200',
  'https://a0.muscache.com/im/pictures/ac4c0087-9196-4987-87c3-91053357260e.jpg?im_w=720',
  'https://a0.muscache.com/im/pictures/2368a2b6-5602-4206-9c3c-4c8e3beaff4b.jpg?im_w=720',
  'https://a0.muscache.com/im/pictures/3fead9af-3ed1-46c0-b6e9-b7248cf9aff4.jpg?im_w=720',
  'https://a0.muscache.com/im/pictures/2368a2b6-5602-4206-9c3c-4c8e3beaff4b.jpg?im_w=720',
];

const ImagesShowcaseMobile: FC<IImageShowcaseProps> = ({ images }) => {
  return (
    <Flex display={['block', 'block', 'inherit', 'none', 'none', 'none']}>
      <Carousel images={images} />
    </Flex>
  );
};

export default ImagesShowcaseMobile;
