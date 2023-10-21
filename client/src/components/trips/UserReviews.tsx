import { FC } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { MdStar } from 'react-icons/md';

import ShowMoreBtn from './ShowMoreBtn';
import UserReviewBox from './UserReviewBox';

type UserReview = {
  createdAt: string;
  rating: number;
  review: string;
  trip: string;
  user: string;
  _id: string;
  __v: number;
};
interface IUserReviewsProps {
  reviews: UserReview[];
  ratingsAverage: number;
  ratingsQuantity: number;
}
const UserReviews: FC<IUserReviewsProps> = ({
  reviews,
  ratingsAverage,
  ratingsQuantity,
}) => {
  const isReviewMoreThanThreshhold = reviews.length > 6 ? true : false;
  const fewReviews = isReviewMoreThanThreshhold ? reviews.slice(0, 6) : reviews;
  return (
    <Flex
      order={7}
      gridGap={4}
      px={{ base: '4', md: '4', lg: '0' }}
      flexDirection='column'
      alignItems='flex-start'
    >
      <Flex justifyContent='center' alignItems='center'>
        <Text
          fontSize={['md', 'lg', '2xl']}
          fontWeight={['semibold', 'medium']}
          color='gray.700'
        >
          <MdStar fill='#38B2AC' />
        </Text>
        <Flex justifyContent='center' alignItems='center' gridGap={1}>
          <Text
            fontSize={['md', 'lg', '2xl']}
            fontWeight={['semibold', 'medium']}
          >
            {ratingsAverage}
          </Text>

          <Text
            fontSize={['md', 'lg', '2xl']}
            fontWeight={['semibold', 'medium']}
            color='gray.900'
          >
            ( {ratingsQuantity} reviews )
          </Text>
        </Flex>
      </Flex>

      <Flex
        flexDirection='row'
        gridGap={6}
        flexWrap='wrap'
        justifyContent='space-between'
      >
        {fewReviews.map(({ createdAt, review, _id }) => {
          const parsedDate = new Date(createdAt)
            .toLocaleDateString()
            .split('/')
            .join('-');

          return (
            <UserReviewBox key={_id} review={review} parsedDate={parsedDate} />
          );
        })}
      </Flex>
      {isReviewMoreThanThreshhold ? <ShowMoreBtn /> : null}
    </Flex>
  );
};

export default UserReviews;
