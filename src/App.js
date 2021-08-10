import React, {useState, useEffect} from 'react';
import { 
  Switch, 
  Route, 
  Link, 
  Redirect 
} from 'react-router-dom';
import axios from 'axios';
import RegistrationPage from './components/Registration/RegistrationPage';
import Home from './components/Home/Home'
import './App.scss';

const App = () => {
  const [open, setOpen] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [textSnackbar, setTextSnackbar] = React.useState("");

  return (
    <div className="App">
      <Switch>
        <Route path='/registration'>
          <RegistrationPage 
            openError={openError} 
            setOpenError={setOpenError} 
            open={open} 
            setOpen={setOpen} 
            textSnackbar={textSnackbar} 
            setTextSnackbar={setTextSnackbar} 
          />
        </Route>
        <Route path='/home' component={Home} />
        <Redirect from='/' to='/registration' />
      </Switch>
    </div>
  );
}

export default App;
