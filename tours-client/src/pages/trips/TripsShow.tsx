import React, { FC } from 'react';
import { Grid } from '@chakra-ui/react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import TripCard from '../../components/TripCard';
import TripsDetails from './TripsDetails';

const devCardData = {
  name: 'Foggy High Hill',
  price: 2000,
  duration: 7,
  difficulty: 'low',
  summary:
    'A hill with crabs and exotic bird species dsaf a fasd dada as dadsf ',
  imageCover: 'df',
  ratingsAverage: 4.67,
  ratingsQuantity: 7,
  tripId: 'sadffsafd',
};
const TripsShow: FC = () => {
  const { path, url } = useRouteMatch();
  console.log(path, url);
  return (
    <React.Fragment>
      <Grid templateColumns='repeat(4, 1fr)' gap={6}>
        <TripCard {...devCardData} />
      </Grid>

      <Switch>
        <Route path={`${path}/:tripsId`}>
          <TripsDetails />
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default TripsShow;
