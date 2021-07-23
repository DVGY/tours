import React, { FC } from 'react';
import { Image } from '@chakra-ui/react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface ICarouselProps {
  imagesUrl: string[];
}

const CarouselContainer: FC<ICarouselProps> = ({ imagesUrl }) => {
  return (
    <Carousel showThumbs={false} showArrows={false}>
      {imagesUrl.map((imageUrl, index) => {
        return (
          <Image
            key={index}
            src={imageUrl}
            objectFit='cover'
            h='100%'
            w='100%'
          />
        );
      })}
    </Carousel>
  );
};

export default CarouselContainer;
