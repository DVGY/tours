import { Flex, Image } from '@chakra-ui/react';
import fallbackImg from '../../assets/placeholder.jpg';

const ImageFallback = (): JSX.Element => {
  return (
    <Flex>
      <Image src={fallbackImg} alt={`image-load-fail`} roundedTop='lg' />
    </Flex>
  );
};

export default ImageFallback;
