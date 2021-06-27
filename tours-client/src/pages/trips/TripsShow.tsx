import React, { FC, useState } from 'react';
import { Box, Flex, Grid, GridItem, Spinner } from '@chakra-ui/react';

import TripCard, { ITripCardProps } from '../../components/trips/TripCard';
import Pagination from '../../components/trips/Pagination';
import FilterTrips from '../../components/trips/FilterTrips';
import FilterTripsMobile from '../../components/trips/FilterTripsMobile';

import useAPI, { AxiosMethods } from '../../hooks/useAPI';

// const devCardData = {
//   _id: 'asdf',
//   name: 'Foggy High Hill',
//   price: 2000,
//   duration: 7,
//   difficulty: 'low',
//   summary:
//     'A hill with crabs and exotic bird species dsaf a fasd dada as dadsf ',
//   imageCover: 'df',
//   ratingsAverage: 4.67,
//   ratingsQuantity: 7,
//   tripId: 'sadffsafd',
// };
export enum TripsDifficultyMode {
  difficult = 'difficult',
  easy = 'easy',
  medium = 'medium',
}

export interface ITripsQueryParams {
  sort: null | string;
  difficulty: null | string[];
  ratingsAverage: number;
  paginate: number;
  limit: number;
}

const TripsShow: FC = () => {
  // -1 descending order
  // http://localhost:1337/api/v1/trips?difficulty=medium&ratingsAverage[gte]=4.7&ratingsAverage[lt]=5.0&sort=-price,ratingsAverage,createdAt&paginate=1&limit=10&fields=
  const [tripsQueryParams, setTripsQueryParams] = useState<ITripsQueryParams>({
    sort: null,
    difficulty: null,
    ratingsAverage: 1,
    paginate: 1,
    limit: 10,
  });

  // const { sort, difficulty, ratingsAverage } = tripsQueryParams;

  const { response, error, loading } = useAPI({
    resource: 'trips',
    query: tripsQueryParams,
  });

  if (error) {
    return <div>Error COmponenet</div>;
  }
  if (loading) {
    return (
      <Flex justifyContent='center' mt='10%' alignItems='stretch'>
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      </Flex>
    );
  }
  // 480 px 30em sm
  // 768 px 48em md
  // 992 px 62em lg
  // 1280 px 80em xl
  // 1536 px 96em 2xl,

  if (response) {
    const { data } = response;
    return (
      <Flex
        flexDirection='row'
        backgroundColor='gray.200'
        px={{ base: '3', md: '4' }}
        marginTop={16}
        py={[10]}
        gap={3}
      >
        {/* <Flex
          // colSpan={1}
          // rowSpan={{ base: 3, md: 5 }}
          // position={{ base: 'fixed', sm: 'fixed', md: 'inherit' }}
          // bottom={{ base: 0 }}
          // left={{ base: 0 }}
          // height={{ base: '100px', md: 'inherit' }}
          // width={{ base: '100%' }}
          // zIndex={{ base: 1 }}
          bg='tomato'
        >
          <Checkbox defaultIsChecked>Checkbox</Checkbox>
        </Box> */}

        <FilterTrips
          queryParams={tripsQueryParams}
          stateSetterQueryParams={setTripsQueryParams}
        />
        <FilterTripsMobile />
        <Box
          bg='transparent'
          flexDirection='column'
          px={4}
          py={4}
          minWidth='200px'
          display={['none', 'none', 'none', 'inherit', 'inherit', 'inherit']}
        >
          {' '}
        </Box>
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(3, 1fr)',
            xl: 'repeat(4, 1fr)',
            '2xl': 'repeat(6, 1fr)',
          }}
          templateRows={'repeat(auto, 1fr)'}
          columnGap={[3, 3, 4, 5, 4]}
          rowGap={{ base: '12', sm: '12', md: '12' }}
          marginBottom={{
            base: '100px',
            md: 'inherit',
            lg: 'inherit',
            xl: 'inherit',
          }}
          pl={[0, 0, 0, 4, 4]}
        >
          {data.trips.map((tripData: ITripCardProps) => (
            <GridItem key={tripData._id}>
              <TripCard {...tripData} />
            </GridItem>
          ))}
          {/* {[
            9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41,
            43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 75,
          ].map((_, index) => (
            <GridItem key={index}>
              <TripCard {...devCardData} />
            </GridItem>
          ))} */}
          <GridItem colStart={1} colEnd={-1}>
            <Pagination />
          </GridItem>
        </Grid>
      </Flex>
    );
  }
  return null;
};

export default TripsShow;
