import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Login from './components/Login';
import Navbar from './components/Navbar';

function App(): JSX.Element {
  return (
    <div className='App'>
      <Navbar />

      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
