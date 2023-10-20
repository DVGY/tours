import React, { FC } from 'react';

import { Route, Routes } from 'react-router-dom';

import Bookings from '../../components/bookings/Bookings';

const BookingsPage: FC = () => {
  console.log('dsaf');
  return (
    <Routes>
      <Route path='/booking-session/:tripId'>
        <Bookings />
      </Route>
    </Routes>
  );
};

export default BookingsPage;
