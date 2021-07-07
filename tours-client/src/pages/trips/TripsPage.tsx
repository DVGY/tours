import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';

import TripsShow from './TripsShow';
import TripsDetails from './TripsDetails';

const TripsPage: FC = () => {
  return (
    <Switch>
      <Route exact path='/trips'>
        <TripsShow />
      </Route>
      <Route path={'/trips/:tripId'}>
        <TripsDetails />
      </Route>
    </Switch>
  );
};

export default TripsPage;
