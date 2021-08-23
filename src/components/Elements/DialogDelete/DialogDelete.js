import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Button,
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle  } from '@material-ui/core';
  import Snackbar from '../Snackbar/Snackbar';
  import './DialogDelete.scss';

const DialogDelete = ({ open, setOpen, records, setRecords, textIndex }) => {
  const [snack, setSnack] = useState({ open: false, openError: false, text: '' });

  const deleteTask = (index) => {
    axios.delete(`http://localhost:8000/deleteRecords?_id=${records[index]._id}`,{
      headers: {
        "token": localStorage.getItem("token"),
      }
    }).then(res => {
      setRecords(res.data.data);
      setOpen(false);
    })
    .catch((error) => {
        if (error.status_code == 401) {
          setSnack({ openError: true, text: error.response.data });
          localStorage.clear();
        }
      }) 
  };

  const handleCloseDelete = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        className="dialog_delete"
        open={open}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Удалить прием"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Вы действительно хотите удалить прием ? 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button 
            onClick={() => deleteTask(textIndex)} 
            color="primary" 
            className="button-save" 
            autoFocus
            >
            Delete
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

export default DialogDelete;
