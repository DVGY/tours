import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Signup from './components/Signup';

function App(): JSX.Element {
  console.log(process.env.API_ENDPOINT);
  console.log(process.env.CHOKIDAR_USEPOLLING);
  console.log(process.env);
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
      </Switch>
    </div>
  );
}

export default App;
