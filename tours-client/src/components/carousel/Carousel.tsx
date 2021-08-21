import React, { FC } from 'react';
import { Image } from '@chakra-ui/react';
import { Carousel } from 'react-responsive-carousel';

import ImageFallback from '../shared/ImageFallback';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './carousel.override.css';

interface ICarouselProps {
  images: string[];
}

const CarouselContainer: FC<ICarouselProps> = ({ images }) => {
  return (
    <Carousel showThumbs={false} showArrows={false}>
      {images.map((image, index) => {
        const imageUrl = `https://a0.muscache.com/im/pictures/${image}?im_w=480`;
        return (
          <Image
            key={index}
            src={imageUrl}
            objectFit='cover'
            h='100%'
            w='100%'
            // display='block'
            fallback={ImageFallback()}
          />
        );
      })}
    </Carousel>
  );
};

export default CarouselContainer;
