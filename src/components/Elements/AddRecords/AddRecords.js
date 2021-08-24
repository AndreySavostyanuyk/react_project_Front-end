import React, { useState } from 'react';
import axios from 'axios';
import { 
  TextField,
  Button,
  NativeSelect, 
  Input
} from '@material-ui/core';
import Snackbar from '../Snackbar/Snackbar';
import './AddRecords.scss';

const AddRecords = ({ setRecords, arrayDoctros }) => {
  const [snack, setSnack] = useState({ open: false, openError: false, text: '' });
  const [textName, setTextName] = useState('');
  const [textDoctor, setTextDoctor] = useState('');
  const [date, setDate] = useState('');
  const [textСomplaints, setTextСomplaints] = useState('');

  const addNewRecords = () => {
    if ( textName.trim() 
      && textDoctor.trim() 
      && textСomplaints.trim()
      && date.trim()
    ){
      axios.post('http://localhost:8000/createRecords', {
      token: localStorage.getItem('token'),
      name: textName.trim(),
      doctor: textDoctor.trim(),
      date,
      complaints: textСomplaints.trim()
      }).then(res => {
        setTextName("");
        setTextDoctor("");
        setDate("");
        setTextСomplaints("");
        setSnack({ open: true, text: "запись успешно дабавлена" });
        setRecords(res.data.data);
      })
      .catch((error) => {
        if (error.status_code === 401) {
          localStorage.clear();
          setSnack({ openError: true, text: error.response.data });
        }
      }); 
    } else {
      setSnack({ openError: true, text: "Введите все значения" });
    }
  };

  const addCheck = () => {
    if (textName && date && textDoctor && textСomplaints) {
      return true
    }
    return false
  }

  return (
    <div>
      <div className="container">
        <div className="data_item__text">
          <span>Имя:</span>
          <TextField 
            id="outlined-basic" 
            variant="outlined" 
            value={textName}
            onChange={(e) => setTextName(e.target.value)}
          />
        </div>
        <div className="data_item__text">
          <span>Врач:</span>
          <NativeSelect
            value={textDoctor}
            id="demo-customized-select-native"
            onChange={(e) => setTextDoctor(e.target.value)}
            input={<Input />}
          >
            <option aria-label="None" value="" />
            { arrayDoctros.map((value, index) => {
              return (
                <option value={value}>{value}</option>
              )
            })
            }
          </NativeSelect>
        </div>
        <div className="data_item__text">
          <span>Дата:</span>
          <TextField 
            id="outlined-basic" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
            variant="outlined"  
          />
        </div>
        <div className="data_item__text">
          <span>Жалобы:</span>
          <TextField 
            id="outlined-basic"
            value={textСomplaints}
            onChange={(e) => setTextСomplaints(e.target.value)}
            variant="outlined"  
          />
        </div>
        <Button 
          variant="outlined" 
          onClick={() => addNewRecords()}
          disabled={!addCheck()}
        >
          Добавить запись
        </Button>
      </div>
      <Snackbar 
        snack={snack}
        setSnack={setSnack}
      />
    </div>
  );
}

export default AddRecords;