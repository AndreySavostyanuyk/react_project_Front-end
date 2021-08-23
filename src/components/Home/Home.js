import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Button} from '@material-ui/core';
import Snackbar from '../Elements/Snackbar/Snackbar';
import Filter from '../Elements/Filter/Filter';
import Sorting from '../Elements/Sorting/Sorting';
import AddRecords from '../Elements/AddRecords/AddRecords';
import Table from '../Elements/Table/Table';
import Logo from '../../source/images/Logo.svg';
import './Home.scss';

const Home = () => {
  const history = useHistory();
  const [snack, setSnack] = useState({ open: false, openError: false, text: '' });
  const [records, setRecords] = useState([]);
  const [data, setData] = useState([]);
  const [flagFilter, setFlagFilter] = useState(false);
  const [flag, setFlag] = useState(false);
  
  useEffect(() => {
    if (!records.length) {
      axios.get('http://localhost:8000/allRecords',{
        headers: {
          "token": localStorage.getItem("token")
        }
      }).then(res => {
        setRecords(res.data.data);
        setData(res.data.data)
      })
    }
  }, [records]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push('/authorization')
    } 
  }, [localStorage.getItem("token")]);

  const clear = () => {
    localStorage.clear();
    history.push('/authorization')
  }

  return (
    <div>
      <header className="homePage_header">
        <div className="header_item">
          <img src={Logo} /> 
          <div className="header_item__text">
            <h1>Приемы</h1>
          </div>
        </div>
        <Button variant="outlined" onClick={() => clear()}>Выход</Button>
      </header>
      <AddRecords 
        setRecords = {setRecords}
      />
      <main>
        <div>
          <Sorting 
            setFlagFilter = {setFlagFilter}
            flag = {flag}
            setFlag = {setFlag}
            data = {data}
            setData = {setData}
          />
          <Filter 
            setFlagFilter = {setFlagFilter}
            flagFilter = {flagFilter}
            records = {records}
            setData = {setData}
            setFlag = {setFlag}
          />
        </div>  
        <Table 
          flag = {flag}
          data = {data}
          setData = {setData}
          records = {records}
          setRecords = {setRecords}
        />
      </main>
      <Snackbar 
        snack={snack}
        setSnack={setSnack}
      />
    </div>
  );
}

export default Home;
