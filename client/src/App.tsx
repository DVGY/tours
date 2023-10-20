import { Route, Routes } from 'react-router-dom';
import { Box } from '@chakra-ui/layout';

import Login from './components/auth/Login';
import Navbar from './components/layout/Navbar';
import Signup from './components/auth/Signup';
import Footer from './components/footer/Footer';

import TripsPage from './pages/trips/TripsPage';
import Dashboard from './pages/dashboard/Dashboard';
// import HomePage from './pages/homepage/Homepage';
import './App.css';
import UserMenu from './pages/user-menu/UserMenu';
import NotFound from './components/not-found/NotFound';
import UserForgotPassword from './pages/user-menu/UserForgotPassword';
import ProtectedRoute from './components/auth/ProtectedRoute';
import BookingsPage from './pages/bookings/BookingsPage';
import ScrollTop from './utils/ScrollTop';

function App(): JSX.Element {
  return (
    <Box>
      <Navbar />
      <ScrollTop />

      <Routes>
        <Route path='/'>
          <TripsPage />
        </Route>
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

        <Route>
          <NotFound />
        </Route>
      </Routes>
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
