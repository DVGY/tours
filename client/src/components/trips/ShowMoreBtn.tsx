import { Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';

const ShowMoreBtn: FC = () => {
  return (
    <Flex justifyContent='flex-start' alignItems='center'>
      <Text
        as='u'
        fontWeight={['semibold', 'medium']}
        color='black'
        fontSize={['sm', 'md', 'lg']}
        cursor='pointer'
      >
        Show More
      </Text>
      <Text fontSize='2xl' color='gray.700'>
        <MdKeyboardArrowRight />
      </Text>
    </Flex>
  );
};

export default ShowMoreBtn;
