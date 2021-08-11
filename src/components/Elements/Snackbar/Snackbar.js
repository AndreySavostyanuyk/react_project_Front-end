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

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SuccessMessage = ({ snack, setSnack }) => {
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnack({ open:false, text:snack.text });
    setSnack({ openError:false, text:snack.text });
  };

  return (
    <div>
        <Snackbar open={snack.open} autoHideDuration={1500} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            { snack.text }
          </Alert>
        </Snackbar>
        <Snackbar open={snack.openError} autoHideDuration={1500} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            { snack.text }
          </Alert>
        </Snackbar>
    </div>
  );
}

export default SuccessMessage;