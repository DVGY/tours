import React, { FC, useState } from 'react';
import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';

import TripCard, { ITripCardProps } from '../../components/trips/TripCard';
import FilterTrips from '../../components/trips/FilterTrips';
import FilterTripsMobile from '../../components/trips/FilterTripsMobile';
import Pagination from '../../components/pagination/Pagination';
import Loading from '../../components/app-state/Loading';
import useAPI from '../../hooks/useAPI';
import ShowError from '../../components/app-state/ShowError';

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
export const PAGE_RESULTS_LIMIT = 10;
const TripsShow: FC = () => {
  /**
   *   This is the params we are trying to build
   *   http://localhost:1337/api/v1/trips?
   *   difficulty=medium&
   *   ratingsAverage[gte]=4.7&ratingsAverage[lt]=5.0&
   *   sort=-price,ratingsAverage,createdAt&
   *   paginate=1&
   *   limit=10&
   *   fields=name
   **/

  const [tripsQueryParams, setTripsQueryParams] = useState<ITripsQueryParams>({
    sort: null,
    difficulty: null,
    ratingsAverage: 1,
    paginate: 1,
    limit: PAGE_RESULTS_LIMIT,
  });

  const [toggleDrawer, setToggleDrawer] = useState(false);

  const { response, error, loading } = useAPI({
    resource: 'trips',
    query: tripsQueryParams,
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
  // }
  // 480 px 30em sm
  // 768 px 48em md
  // 992 px 62em lg
  // 1280 px 80em xl
  // 1536 px 96em 2xl,
  if (response) {
    const { data, results: totalResults } = response;
    const { limit } = tripsQueryParams;

    return (
      <Flex
        flexDirection='row'
        backgroundColor='gray.200'
        px={{ base: '3', md: '4', lg: '4', xl: 6 }}
        marginTop={[16, 16, 16, 20, 20, 20]}
        py={[10, 10, 10, 16, 20, 20]}
        maxWidth='2000px'
        marginLeft='auto'
        marginRight='auto'
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
        <FilterTripsMobile
          queryParams={tripsQueryParams}
          stateSetterQueryParams={setTripsQueryParams}
          toggleDrawerState={toggleDrawer}
          stateSetterToggleDrawer={setToggleDrawer}
        />
        {/* <Box
          bg='transparent'
          flexDirection='column'
          px={4}
          py={4}
          minWidth='200px'
          display={['none', 'none', 'none', 'inherit', 'inherit', 'inherit']}
        >
          {' '}
        </Box> */}
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(2, 1fr)',
            xl: 'repeat(3, 1fr)',
            '2xl': 'repeat(4, 1fr)',
          }}
          templateRows={'repeat(auto, 1fr)'}
          columnGap={[3, 3, 4, 5, 4, 6]}
          rowGap={{
            base: '12',
            sm: '12',
            md: '12',
            lg: '12',
            xl: 12,
          }}
          marginBottom={{
            base: '100px',
            md: 'inherit',
            lg: 'inherit',
            xl: 'inherit',
          }}
          pl={[0, 0, 0, 4, 4, 6]}
        >
          {data.trips.map((tripData: ITripCardProps) => (
            <GridItem key={tripData._id}>
              <TripCard {...tripData} />
            </GridItem>
          ))}

          <GridItem colStart={1} colEnd={-1} justifySelf='center'>
            <Pagination
              postsPerPage={limit}
              totalPosts={totalResults}
              queryParams={tripsQueryParams}
              stateSetterQueryParams={setTripsQueryParams}
            />
          </GridItem>
        </Grid>
      </Flex>
    );
  }

  return <Box h='100vh'></Box>;
};

export default TripsShow;
