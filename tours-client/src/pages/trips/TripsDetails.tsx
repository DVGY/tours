import React, { FC } from 'react';
import { Flex } from '@chakra-ui/react';

import Headeline from '../../components/trips/Headline';
import ImagesShowcase from '../../components/trips/ImagesShowcase';
import useAPI from '../../hooks/useAPI';
import Loading from '../../components/app-state/Loading';
import ShowError from '../../components/app-state/ShowError';
import { useParams } from 'react-router';

interface IURLparams {
  tripId: string;
}

const TripsDetails: FC = () => {
  const params = useParams<IURLparams>();

  const { response, error, loading } = useAPI({
    resource: `trips/${params.tripId}`,
  });

  if (error) {
    const { data } = error;
    const errorData = JSON.stringify(data);

    return <ShowError error={errorData} />;
  }

  if (loading) {
    return <Loading />;
  }

  if (response) {
    const { data } = response;
    const { name, ratingsAverage, ratingsQuantity } = data.trips;
    return (
      <Flex
        p={{ base: '3', md: '4' }}
        marginTop={16}
        mx='auto'
        maxW='7xl'
        flexDirection='column'
        gridGap={[4]}
      >
        <Headeline
          name={name}
          ratingsAverage={ratingsAverage}
          ratingsQuantity={ratingsQuantity}
        />
        <ImagesShowcase />
      </Flex>
    );
  }

  return null;
};

export default TripsDetails;
