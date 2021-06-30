import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Box } from '@chakra-ui/layout';

import Login from './components/Login';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Footer from './components/footer/Footer';

import TripsPage from './pages/trips/TripsPage';
// import HomePage from './pages/homepage/Homepage';

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
        <Route path='/trips'>
          <TripsPage />
        </Route>

        <Redirect from='/' to='/trips' />
        {/* <ProtectedRoute path='/landing'>
          <Landing />
        </ProtectedRoute> */}
      </Switch>
      <Footer />

      <Box
        bg='transparent'
        flexDirection='column'
        px={4}
        py={4}
        minHeight='100px'
        display={['inherit', 'inherit', 'inherit', 'none', 'none', 'none']}
      >
        {' '}
      </Box>
    </Box>
  );
}

export default App;
