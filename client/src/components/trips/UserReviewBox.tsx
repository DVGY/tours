import React, { FC } from 'react';
import { Flex, Text, Avatar } from '@chakra-ui/react';

interface IUserReviewBoxProps {
  // _id:string,
  review: string;
  parsedDate: string;
}

const UserReviewBox: FC<IUserReviewBoxProps> = ({ review, parsedDate }) => {
  return (
    <Flex
      gridGap={4}
      flexDirection='column'
      alignItems='center'
      flexBasis={['100%', '100%', '50%', '40%']}
      flexGrow={0}
      flexShrink={0}
    >
      <Flex gridGap={3} alignSelf='flex-start'>
        <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
        <Flex flexDirection='column'>
          <Text>Name</Text>
          <Text>{parsedDate}</Text>
        </Flex>
      </Flex>
      <Text fontSize={['sm', 'md', 'lg']} alignSelf='flex-start'>
        {review}
      </Text>
    </Flex>
  );
};

export default UserReviewBox;
