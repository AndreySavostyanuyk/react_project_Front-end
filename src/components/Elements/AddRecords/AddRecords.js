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


const AddRecords = ({ setRecords }) => {
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
      ) {
      axios.post('http://localhost:8000/createRecords', {
      userId: localStorage.getItem('token'),
      name: textName.trim(),
      doctor: textDoctor.trim(),
      date: date,
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
        if (error.status_code == 401) {
          localStorage.clear();
          setSnack({ openError: true, text: error.response.data });
        }
      }) 
    } else {
      setSnack({ openError: true, text: "Введите все значения" });
    }
  };

  const handleChangeName = (event) => {
    setTextName(event);
  };

  const handleChangeDoctor = (event) => {
    setTextDoctor(event);
  };

  const handleChangeDate = (event) => {
    setDate(event);
  };

  const handleChangeСomplaints = (event) => {
    setTextСomplaints(event);
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
            onChange={(e) => handleChangeName(e.target.value)}
          />
        </div>
        <div className="data_item__text">
          <span>Врач:</span>
          <NativeSelect
            value={textDoctor}
            id="demo-customized-select-native"
            onChange={(e) => handleChangeDoctor(e.target.value)}
            input={<Input />}
          >
            <option aria-label="None" value="" />
            <option value="Иван Иванович">Иван Иванович</option>
            <option value="Дмитрий Дмитриевич">Дмитрий Дмитриевич</option>
            <option value="Николай Николаевич">Николай Николаевич</option>
          </NativeSelect>
        </div>
        <div className="data_item__text">
          <span>Дата:</span>
          <TextField 
            id="outlined-basic" 
            value={date}
            onChange={(e) => handleChangeDate(e.target.value)}
            type="date"
            variant="outlined"  
          />
        </div>
        <div className="data_item__text">
          <span>Жалобы:</span>
          <TextField 
            id="outlined-basic"
            value={textСomplaints}
            onChange={(e) => handleChangeСomplaints(e.target.value)}
            variant="outlined"  
          />
        </div>
        <Button 
          variant="outlined" 
          onClick={() => addNewRecords()}
          disabled={!addCheck() ? "disabled" : ''}
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




