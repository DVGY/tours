import { Avatar, Divider, Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';
import ShowMoreBtn from './ShowMoreBtn';

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

const TripInfo: FC<ITripInfoProp> = ({ description, guides }) => {
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
          <ShowMoreBtn />
        </Flex>
        <Divider orientation='horizontal' height='20px' color='gray.200' />
        <Text
          fontSize={['md', 'lg', '2xl']}
          fontWeight={['semibold', 'medium']}
          pb={2}
        >
          Meet Your Trip Guides
        </Text>
        {guides.map(({ _id: id, role, name }) => {
          const formatRole = role.toLowerCase().split('_').join(' ');
          return (
            <Flex key={id} gridGap={4} alignItems='center'>
              <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
              <Text textTransform='capitalize'>{formatRole}</Text>
              <Text>{name}</Text>
            </Flex>
          );
        })}
      </Flex>
      {/* 
      Use this code to see avability and schedule
      
      <Box position='static'>
        <Box h='400px' w='400px' bg='red' position='sticky' top={80}></Box>
      </Box> */}
    </Flex>
  );
};

export default TripInfo;
