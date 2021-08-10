import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios'
import { makeStyles, TextField, Button } from '@material-ui/core';
import Snackbar from '../Elements/Snackbar/Snackbar';
import Logo from '../../source/images/Logo.svg';
import Background from '../../source/images/background.svg';
import './RegistrationPage.scss';

const RegistrationPage = () => {
  const [users, setUsers] = React.useState([])
  const [textLogin, setTextLogin] = React.useState('');
  const [textPassword, setTextPassword] = React.useState('');
  const [textRepeatPassword, setTextRepeatPassword] = React.useState('');
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

  const handleChangeRepeatPassword = (event) => {
    setTextRepeatPassword(event);
  };

  const addNewUser= () => {
    const regexp =  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (textPassword === textRepeatPassword 
        && textLogin.trim() 
        && textPassword.trim() 
        && textRepeatPassword.trim() 
        && textLogin.length >= 6
        && regexp.test(textPassword)
      ) {
      axios.post('http://localhost:8000/createUsers', {
      login: textLogin.trim(),
      password: textPassword.trim()
      }).then(res => {
        history.push('/home')
        setTextLogin("");
        setTextPassword("");
        setTextRepeatPassword("");
        setTextSnackbar("запись успешно дабавлена");
        setOpen(true);
        setUsers(res.data.data);
      }) 
    } else {
      setTextSnackbar("Введите значение");
      setOpenError(true);
    }
  };

  return (
    <div>
      <header className="registrationPage_header">
        <img src={Logo} /> 
        <div className="header_item__text">
          <h1>Зарегистрироваться в системе</h1>
        </div>
      </header>
      <main className="registrationPage_main">
        <div className="main_container">
          <div className="main_item__img">
            <img src={Background} /> 
          </div>
          <div className="container_registration">
            <h1>Регистрация</h1>
            <div className="registration_item__data">
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
              <div className="data_item__text">
                <span>Repeat password:</span>
                <TextField 
                  id="outlined-basic" 
                  label="Repeat password" 
                  variant="outlined" 
                  value={textRepeatPassword} 
                  onChange={(e) => handleChangeRepeatPassword(e.target.value)} 
                />
              </div>
            </div>
            <div className="data_item_button">
              <div className="button_item">
              <Button variant="outlined" onClick={() => addNewUser()}>Зарегистрироваться</Button>
                <Button>Авторизоваться</Button>
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

export default RegistrationPage;
