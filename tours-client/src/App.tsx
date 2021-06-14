import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Box } from '@chakra-ui/layout';

import Login from './components/Login';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Footer from './components/footer/Footer';

import TripsPage from './pages/trips/TripsPage';

import './App.css';

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

        <Route path={['/trips', '/']}>
          <TripsPage />
        </Route>

        {/* <ProtectedRoute path='/landing'>
          <Landing />
        </ProtectedRoute> */}
      </Switch>
      <Footer />
    </Box>
  );
}

export default App;
