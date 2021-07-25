import React, { FC } from 'react';
import { Flex, Text, Avatar, Divider, Button } from '@chakra-ui/react';
import { MdKeyboardArrowRight } from 'react-icons/md';
type guide = {
  role: string;
  name: string;
  email: string;
  _id: string;
};
interface ITripInfoProp {
  description: string;
  guides: guide[];
  summary: string;
}

const TripInfo: FC<ITripInfoProp> = ({ description, guides, summary }) => {
  // const trimLongDescription;
  return (
    <Flex order={3} px={{ base: '4', md: '4', lg: '0' }}>
      <Flex flexDirection='column' gridGap={3}>
        <Flex flexDirection='column' gridGap={3}>
          <Text
            fontSize={['md', 'lg', '2xl']}
            fontWeight={['semibold', 'medium']}
          >
            Description
          </Text>
          <Text fontSize={['md', 'lg', '2xl']}>{description}</Text>
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
        </Flex>
        <Divider orientation='horizontal' height='20px' color='gray.200' />
        <Text
          fontSize={['md', 'lg', '2xl']}
          fontWeight={['semibold', 'medium']}
        >
          Meet Your Trip Guides
        </Text>
        {guides.map(({ _id: id, role, name }) => (
          <Flex key={id} gridGap={3}>
            <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
            <Text>{role}</Text>
            <Text>{name}</Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default TripInfo;
