import React, { FC } from 'react';
import { Grid, GridItem, Image } from '@chakra-ui/react';
import ImageFallback from '../shared/ImageFallback';

export interface IImageShowcaseProps {
  images: string[];
}

const ImagesShowcase: FC<IImageShowcaseProps> = ({ images }) => {
  const gridItemProps = [
    {
      item: 1,
      gridRow: '1/5',
      gridColumn: '1/7',
    },
    {
      item: 2,
      gridRow: '1/3',
      gridColumn: '7/10',
    },
    {
      item: 3,
      gridRow: '1/3',
      gridColumn: '10/13',
    },
    {
      item: 4,
      gridRow: '3/5',
      gridColumn: '7/10',
    },
    {
      item: 5,
      gridRow: '3/5',
      gridColumn: '10/13',
    },
  ];
  return (
    <Grid
      templateColumns='repeat(12, 1fr)'
      templateRows='repeat(4,8vw)'
      gap={3}
      display={['none', 'none', 'none', 'grid', 'grid', 'grid']}
    >
      {gridItemProps.map(({ item, gridRow, gridColumn }, index) => {
        const image = images[index] ? images[index] : '';
        return (
          <GridItem key={item} gridRow={gridRow} gridColumn={gridColumn}>
            <Image
              src={`https://a0.muscache.com/im/pictures/${image}?im_w=720`}
              alt='trip image'
              objectFit='cover'
              h='100%'
              w='100%'
              fallback={ImageFallback()}
            />
          </GridItem>
        );
      })}
      {/* <GridItem gridRow='1/5' gridColumn='1/7'>
        <picture>
          <Image
            src='https://a0.muscache.com/im/pictures/6c0e09d9-2537-4c2a-9180-4f14e22a1996.jpg?im_w=1200'
            alt='Segun Adebayo'
            objectFit='cover'
            h='100%'
            w='100%'
          />
        </picture>
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

      <GridItem gridRow='3/5' gridColumn='10/13'> */}
      {/* <Image
          src='https://a0.muscache.com/im/pictures/2368a2b6-5602-4206-9c3c-4c8e3beaff4b.jpg?im_w=720'
          alt='Segun Adebayo'
          objectFit='cover'
          h='100%'
          w='100%'
        />
      </GridItem> */}
    </Grid>
  );
};

export default ImagesShowcase;
