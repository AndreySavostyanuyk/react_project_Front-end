import React, { useEffect } from 'react';
import { 
  Button,  
  FormControl, 
  InputBase, 
  NativeSelect, 
  Select, 
  MenuItem, 
  InputLabel, 
  makeStyles,
  withStyles,
  Snackbar,
 } from '@material-ui/core'; 
import MuiAlert from '@material-ui/lab/Alert';
import '../../../App.scss';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SuccessMessage = ({ textSnackbar, open, setOpen, openError, setOpenError, openInfo, setOpenInfo }) => {
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setOpenError(false);
  };

  return (
    <div>
        <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            {textSnackbar}
          </Alert>
        </Snackbar>
        <Snackbar open={openError} autoHideDuration={1500} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {textSnackbar}
          </Alert>
        </Snackbar>
    </div>
  );
}

export default SuccessMessage;