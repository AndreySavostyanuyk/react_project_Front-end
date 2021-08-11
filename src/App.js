import React, {useState, useEffect} from 'react';
import { 
  Switch, 
  Route, 
  Link, 
  Redirect 
} from 'react-router-dom';
import axios from 'axios';
import RegistrationPage from './components/Registration/RegistrationPage';
import AuthorizationPage from './components/Authorization/AuthorizationPage';
import Home from './components/Home/Home';
import './App.scss';

const App = () => {

  return (
    <div className="App">
      <Switch>
        <Route path='/registration' component={RegistrationPage} />
        <Route path='/authorization' component={AuthorizationPage} />
        <Route path='/home' component={Home} />
        <Redirect from='/' to='/registration' />
      </Switch>
    </div>
  );
}

export default App;
