import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Box } from '@chakra-ui/layout';

import Login from './components/Login';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Footer from './components/footer/Footer';

import TripsPage from './pages/trips/TripsPage';
import Dashboard from './pages/dashboard/Dashboard';
// import HomePage from './pages/homepage/Homepage';
import './App.css';
import UserMenu from './pages/user-menu/UserMenu';
import NotFound from './components/not-found/NotFound';
import UserForgotPassword from './pages/user-menu/UserForgotPassword';
import ProtectedRoute from './components/ProtectedRoute';
import BookingsPage from './pages/bookings/BookingsPage';

function App(): JSX.Element {
  return (
    <Box>
      <Navbar />

      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
        <Route path='/trips'>
          <TripsPage />
        </Route>
        <Route path='/dashboard'>
          <Dashboard />
        </Route>
        <ProtectedRoute path='/user'>
          <UserMenu />
        </ProtectedRoute>

        <Route path='/forgot-password'>
          <UserForgotPassword />
        </Route>

        <Route path='/booking-session'>
          <BookingsPage />
        </Route>

        <Redirect exact from='/' to='/trips' />
        <Route>
          <NotFound />
        </Route>
      </Switch>
      <Footer />

      <Box
        flexDirection='column'
        px={4}
        py={4}
        minHeight='70px'
        bgColor='gray.50'
        display={[
          'inherit',
          'inherit',
          'inherit',
          'inherit',
          'inherit',
          'inherit',
        ]}
      >
        {' '}
      </Box>
    </Box>
  );
}

export default App;
