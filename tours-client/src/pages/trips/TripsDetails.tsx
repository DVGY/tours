import React, { FC } from 'react';
import { Divider, Flex } from '@chakra-ui/react';

import Headeline from '../../components/trips/Headline';
import ImagesShowcase from '../../components/trips/ImagesShowcase';
import useAPI from '../../hooks/useAPI';
import Loading from '../../components/app-state/Loading';
import ShowError from '../../components/app-state/ShowError';
import { useParams } from 'react-router';
import ImagesShowcaseMobile from '../../components/trips/ImagesShowcaseMobile';
import BookTrip from '../../components/trips/BookTrip';
import TripInfo from '../../components/trips/TripInfo';
import TripRouteMap from '../../components/trips/TripRouteMap';
import UserReviews from '../../components/trips/UserReviews';
import TripOffers from '../../components/trips/TripOffers';

interface IURLparams {
  tripId: string;
}

const TripsDetails: FC = () => {
  const params = useParams<IURLparams>();
  console.log(params);
  const { response, error, loading } = useAPI({
    resource: `trips/${params.tripId}`,
  });

  if (error) {
    const { data } = error;
    const errorData = JSON.stringify(data);

    return <ShowError error={errorData} />;
  }

  if (loading) {
    return (
      <Flex
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        h='100vh'
      >
        <Loading />
      </Flex>
    );
  }

  if (response) {
    const { data } = response;
    const {
      name,
      ratingsAverage,
      ratingsQuantity,
      price,
      duration,
      guides,
      description,
      summary,
      startLocation,
      locations,
      reviews,
      images,
      _id: tripId,
    } = data.trips;
    return (
      <Flex
        p={{ base: '0', md: '0', lg: '4' }}
        marginTop={{ sm: 16, lg: 28 }}
        mx='auto'
        maxW='8xl'
        flexDirection='column'
        gridGap={[4]}
      >
        <Headeline
          name={name}
          ratingsAverage={ratingsAverage}
          ratingsQuantity={ratingsQuantity}
        />

        <ImagesShowcase images={images} />
        <Divider
          display={['none', 'none', 'none', 'inherit', 'inherit', 'inherit']}
          orientation='horizontal'
          height='20px'
        />
        <ImagesShowcaseMobile images={images} />

        <BookTrip
          duration={duration}
          ratingsAverage={ratingsAverage}
          ratingsQuantity={ratingsQuantity}
          price={price}
          tripId={tripId}
        />
        <Flex
          order={2}
          px={{ base: '4', md: '4', lg: '0' }}
          display={['block', 'block', 'block', 'none', 'none', 'none']}
        >
          <Divider orientation='horizontal' height='20px' color='gray.200' />
        </Flex>
        <TripInfo description={description} guides={guides} summary={summary} />
        <Divider orientation='horizontal' height='20px' order={5} />
        <TripRouteMap startLocation={startLocation} locations={locations} />
        <Divider orientation='horizontal' height='20px' order={6} />
        <UserReviews
          reviews={reviews}
          ratingsAverage={ratingsAverage}
          ratingsQuantity={ratingsQuantity}
        />
        <Divider orientation='horizontal' height='20px' order={8} />
        <TripOffers />
      </Flex>
    );
  }
  return null;
};

export default TripsDetails;
