import React, { FC } from 'react';
import { Grid, GridItem, Image } from '@chakra-ui/react';

const ImagesShowcase: FC = () => {
  return (
    <Grid
      templateColumns='repeat(12, 1fr)'
      templateRows='repeat(4,8vw)'
      gap={3}
      gridAutoFlow='row'
      display={['none', 'none', 'none', 'inherit', 'inherit', 'inherit']}
    >
      <GridItem gridRow='1/5' gridColumn='1/7'>
        <Image
          src='https://a0.muscache.com/im/pictures/6c0e09d9-2537-4c2a-9180-4f14e22a1996.jpg?im_w=1200'
          alt='Segun Adebayo'
          objectFit='cover'
          h='100%'
          w='100%'
        />
      </GridItem>
      <GridItem gridRow='1/3' gridColumn='7/10'>
        <Image
          src='https://a0.muscache.com/im/pictures/ac4c0087-9196-4987-87c3-91053357260e.jpg?im_w=720'
          alt='Segun Adebayo'
          objectFit='cover'
          h='100%'
          w='100%'
        />
      </GridItem>
      <GridItem gridRow='1/3' gridColumn='10/13'>
        <Image
          src='https://a0.muscache.com/im/pictures/2368a2b6-5602-4206-9c3c-4c8e3beaff4b.jpg?im_w=720'
          alt='Segun Adebayo'
          objectFit='cover'
          h='100%'
          w='100%'
        />
      </GridItem>
      <GridItem gridRow='3/5' gridColumn='7/10'>
        <Image
          src='https://a0.muscache.com/im/pictures/3fead9af-3ed1-46c0-b6e9-b7248cf9aff4.jpg?im_w=720'
          alt='Segun Adebayo'
          objectFit='cover'
          h='100%'
          w='100%'
        />
      </GridItem>

      <GridItem gridRow='3/5' gridColumn='10/13'>
        <Image
          src='https://a0.muscache.com/im/pictures/2368a2b6-5602-4206-9c3c-4c8e3beaff4b.jpg?im_w=720'
          alt='Segun Adebayo'
          objectFit='cover'
          h='100%'
          w='100%'
        />
      </GridItem>
    </Grid>
  );
};

export default ImagesShowcase;
