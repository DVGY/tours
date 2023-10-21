import { Grid, GridItem, Image } from '@chakra-ui/react';
import { FC } from 'react';
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
      templateRows='repeat(4,1fr)'
      gap={{ lg: 1 }}
      display={['none', 'none', 'none', 'grid', 'grid', 'grid']}
      height={{ lg: '35vw', xl: '30vw', '2xl': '20.33vw' }}
    >
      {gridItemProps.map(({ item, gridRow, gridColumn }, index) => {
        const image = images[index] ? images[index] : '';
        return (
          <GridItem key={item} gridRow={gridRow} gridColumn={gridColumn}>
            <Image
              src={`https://a0.muscache.com/im/pictures/${image}?im_w=720`}
              alt='trip image'
              // objectFit='cover'
              h='100%'
              w='100%'
              fallback={ImageFallback()}
            />
          </GridItem>
        );
      })}
    </Grid>
  );
};

export default ImagesShowcase;
