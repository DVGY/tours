import React from 'react';
import { FC } from 'react-dom/node_modules/@types/react';
import { Route, Switch } from 'react-router-dom';

import Bookings from '../../components/bookings/Bookings';

const BookingsPage: FC = () => {
  console.log('dsaf');
  return (
    <Switch>
      <Route path='/booking-session/:tripId'>
        <Bookings />
      </Route>
    </Switch>
  );
};

export default BookingsPage;
