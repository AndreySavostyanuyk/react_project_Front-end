import React, { useEffect } from 'react';
import './App.scss';
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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const SuccessMessage = ({ textSnackbar, open, setOpen, openError, setOpenError, openInfo, setOpenInfo }) => {
  const classes = useStyles();
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setOpenError(false);
    // setOpenInfo(false);
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
        {/* <Snackbar open={openInfo} autoHideDuration={1500} onClose={handleClose}>
          <Alert onClose={handleClose} severity="info">
          {textSnackbar}
          </Alert>
        </Snackbar> */}
    </div>
  );
}

export default SuccessMessage;