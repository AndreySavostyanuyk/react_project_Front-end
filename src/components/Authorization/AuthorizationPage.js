import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { makeStyles, TextField, Button } from '@material-ui/core';
import Snackbar from '../Elements/Snackbar/Snackbar';
import Logo from '../../source/images/Logo.svg';
import Background from '../../source/images/background.svg';
import './AuthorizationPage.scss';

const AuthorizationPage = () => {
  const [textLogin, setTextLogin] = React.useState('');
  const [textPassword, setTextPassword] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [textSnackbar, setTextSnackbar] = React.useState("");

  const history = useHistory();

  const handleChangeLogin = (event) => {
    setTextLogin(event);
  };

  const handleChangePassword = (event) => {
    setTextPassword(event);
  };

  const login = () => {
    const regexp =  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (textLogin.trim() 
        && textPassword.trim() 
        && textLogin.length >= 6
        && regexp.test(textPassword)
      ) {
      axios.post('http://localhost:8000/loginUsers', {
        login: textLogin.trim(),
        password: textPassword.trim()
      }).then(res => {
        setTextLogin("");
        setTextPassword("");
        setTextSnackbar("авторизация прошла успешно");
        history.push('/home')
        setOpen(true);
      }) 
    } else {
      setTextSnackbar("Введите значение");
      setOpenError(true);
    }
  };

  return (
    <div>
      <header className="authorizationPage_header">
        <img src={Logo} /> 
        <div className="header_item__text">
          <h1>Войти в систему</h1>
        </div>
      </header>
      <main className="authorizationPage_main">
        <div className="main_container">
          <div className="main_item__img">
            <img src={Background} /> 
          </div>
          <div className="container_authorization">
            <h1>Войти в систему</h1>
            <div className="authorization_item__data">
              <div className="data_item__text">
                <span>Login:</span>
                <TextField 
                  id="outlined-basic" 
                  label="Login" 
                  variant="outlined" 
                  value={textLogin} 
                  onChange={(e) => handleChangeLogin(e.target.value)} 
                />
              </div>
              <div className="data_item__text">
                <span>Password:</span>
                <TextField 
                  id="outlined-basic" 
                  label="Password" 
                  variant="outlined" 
                  value={textPassword} 
                  onChange={(e) => handleChangePassword(e.target.value)} 
                />
              </div>
            </div>
            <div className="data_item_button">
              <div className="button_item">
              <Button variant="outlined" onClick={() => login()}>Войти</Button>
              <Link to="/registration"><Button>Зарегистрироваться</Button></Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Snackbar 
        openError={openError} 
        setOpenError={setOpenError} 
        open={open} 
        setOpen={setOpen} 
        textSnackbar={textSnackbar} 
      />
    </div>
  );
}

export default AuthorizationPage;
