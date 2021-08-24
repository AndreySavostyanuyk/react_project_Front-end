import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  TextField,
  Button,
  NativeSelect, 
  Input, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle  
} from '@material-ui/core';
import Snackbar from '../Snackbar/Snackbar';
import './DialogWindow.scss';

const DialogWindow = ({ setRecords, openDialog, setOpenDialog, item, textIndex, setTextIndex, records, arrayDoctros }) => {
  const [changeTextName, setChangeTextName] = useState('');
  const [changeTextDoctor, setChangeTextDoctor] = useState('');
  const [changeDate, setChangeDate] = useState('');
  const [changetextСomplaints, setChangetextСomplaints] = useState('');
  const [snack, setSnack] = useState({ open: false, openError: false, text: '' });
  const {name, doctor, date, complaints} = item;
  
  useEffect(() => {
    setChangeTextName(name);
    setChangeTextDoctor(doctor);
    setChangeDate(date);
    setChangetextСomplaints(complaints);
  }, [item]);
  
  const handleClose = () => {
    setTextIndex("");
    setOpenDialog(false);
  };

  const handleChangeName = (event) => {
    setChangeTextName(event);
  };
  const handleChangeDoctor = (event) => {
    setChangeTextDoctor(event);
  };
  const handleChangeDate = (event) => {
    setChangeDate(event);
  };
  const handleChangeСomplaints = (event) => {
    setChangetextСomplaints(event);
  };

  const editRecords = (index) => {
    
    if ( changeTextName.trim() 
      && changeTextDoctor.trim() 
      && changetextСomplaints.trim()
      && changeDate.trim()
    ) {
      axios.patch('http://localhost:8000/editRecords', {
      _id: records[textIndex]._id, 
      name: changeTextName.trim(),
      doctor: changeTextDoctor.trim(),
      date: changeDate,
      complaints: changetextСomplaints.trim()
      },
      {
        headers: {
          "token": localStorage.getItem("token")
        }
      }).then(res => {
        setChangeTextName("");
        setChangeTextDoctor("");
        setChangeDate("");
        setChangetextСomplaints("");
        setSnack({ open: true, text: "запись успешно дабавлена" });
        setRecords(res.data.data);
        setTextIndex("");
        setOpenDialog(false);
      }) 
      .catch((error) => {
        if (error.response) {
          setSnack({ openError: true, text: error.response.data });
        }
      })
    } else {
      setSnack({ openError: true, text: "Введите все значения" });
    }
  };

  return (
    <div>
      <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Изменить прием</DialogTitle>
        <DialogContent>
          <div>
            <div className="data_item__text">
              <span>Имя:</span>
              <TextField 
                id="outlined-basic" 
                variant="outlined" 
                defaultValue={changeTextName}
                onChange={(e) => handleChangeName(e.target.value)}
              />
            </div>
            <div className="data_item__text">
              <span>Врач:</span>
              <NativeSelect
                id="demo-customized-select-native"
                defaultValue={changeTextDoctor}
                onChange={(e) => handleChangeDoctor(e.target.value)}
                input={<Input />}
              >
                { arrayDoctros.map((value) => 
                  <option value={value}>{value}</option>
                )
                }
              </NativeSelect>
            </div>
            <div className="data_item__text">
              <span>Дата:</span>
              <TextField 
                id="outlined-basic" 
                defaultValue={changeDate}
                onChange={(e) => handleChangeDate(e.target.value)}
                type="date"
                variant="outlined"  
              />
            </div>
            <div className="data_item__text">
              <span>Жалобы:</span>
              <TextField 
                id="outlined-basic"
                defaultValue={changetextСomplaints}
                onChange={(e) => handleChangeСomplaints(e.target.value)}
                variant="outlined" 
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()} variant="outlined">
            Cancel
          </Button>
          <Button className="button-save" onClick={() => editRecords(textIndex)}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar 
        snack={snack}
        setSnack={setSnack}
      />
    </div>
  );
}

export default DialogWindow;