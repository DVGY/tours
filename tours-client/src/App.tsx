import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './components/Login';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Landing from './pages/Landing';
import ProtectedRoute from './components/ProtectedRoute';

import './App.css';

function App(): JSX.Element {
  return (
    <div className='App'>
      <Navbar />

      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>

        <ProtectedRoute path='/landing'>
          <Landing />
        </ProtectedRoute>
      </Switch>
    </div>
  );
}

export default App;
