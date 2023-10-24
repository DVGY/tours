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
import NotFound from './components/not-found/NotFound';
import UserForgotPassword from './pages/user-menu/UserForgotPassword';
import ProtectedRoute from './components/auth/ProtectedRoute';
// import BookingsPage from './pages/bookings/BookingsPage';
import ScrollTop from './utils/ScrollTop';
import TripsShow from './pages/trips/TripsShow';
import TripsDetails from './pages/trips/TripsDetails';
import Bookings from './components/bookings/Bookings';
import UserSettings from './components/user-menu/UserSettings';
import UserSecurity from './components/user-menu/UserSecurity';
import UserProfile from './components/user-menu/UserProfile';
import BookingsPage from './pages/bookings/BookingsPage';

function App(): JSX.Element {
  return (
    <Box>
      <Navbar />
      <ScrollTop />
      <Routes>
        <Route path='/' element={<TripsPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/trips/*'>
          <Route index element={<TripsShow />} />
          <Route path=':tripId' element={<TripsDetails />} />
          <Route path='*' element={<NotFound />} />
        </Route>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/user'>
          <Route
            path='/user/profile'
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path='/user/security'
            element={
              <ProtectedRoute>
                <UserSecurity />
              </ProtectedRoute>
            }
          />
          <Route
            path='/user/settings'
            element={
              <ProtectedRoute>
                <UserSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path='/user/bookings'
            element={
              <ProtectedRoute>
                <BookingsPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute>
              <UserForgotPassword />
            </ProtectedRoute>
          }
        />

        <Route path='/booking-session'>
          <Route path=':tripId' element={<Bookings />} />
        </Route>
        <Route path='*' element={<NotFound />} />
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
