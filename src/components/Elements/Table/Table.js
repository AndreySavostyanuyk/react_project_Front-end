import React, { useState } from 'react';
import Snackbar from '../Snackbar/Snackbar';
import DialogWindow from '../Dialog/DialogWindow';
import DialogDelete from '../DialogDelete/DialogDelete';
import Delete from '../../../source/images/delete.svg';
import Edit from '../../../source/images/edit.svg';
import './Table.scss';

const Table = ({ records, setRecords, data, flag }) => {
  const [snack, setSnack] = useState({ open: false, openError: false, text: '' });
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState('');
  const [textIndex, setTextIndex] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDelete = () => {
    setOpen(true);
  };

  const testFunction = (value, index) => {
    setItem(value);
    setTextIndex(index);
  }

  const handleClickOpen = (index) => {
    setOpenDialog(true);
  }

  return (
    <div className="main_items">
      <table className="table">
        <thead>
          <tr>
            <th>Имя</th>
            <th>Врач</th>
            <th>Дата</th>
            <th>Жалобы</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { !flag ?
            records.map((value, index) => {
              return (
                <tr>
                  <td>{value.name}</td>
                  <td>{value.doctor}</td>
                  <td>{value.date}</td>
                  <td>{value.complaints}</td>
                  <td>
                    <div className="item_img">
                      <img 
                        src={Delete} 
                        onClick={() => (handleClickOpenDelete(),testFunction(value, index))}
                      />
                      <img 
                        src={Edit} 
                        onClick={() => (handleClickOpen(index), testFunction(value, index)) }
                      />
                    </div>
                    
                  </td>
                </tr>
              )
            })
            :
            data.map((value, index) => {
              return (
                <tr>
                  <td>{value.name}</td>
                  <td>{value.doctor}</td>
                  <td>{value.date}</td>
                  <td>{value.complaints}</td>
                  <td>
                    <div className="item_img">
                      <img 
                        src={Delete} 
                        onClick={() => (handleClickOpenDelete(),testFunction(value, index))}
                      />
                      <img 
                        src={Edit} 
                        onClick={() => (handleClickOpen(index), testFunction(value, index)) }
                      />
                    </div> 
                  </td>
                </tr>
              )
            })
          }
        
        </tbody>
      </table>
      <DialogDelete 
        records = {records}
        setRecords = {setRecords}
        open = {open}
        setOpen = {setOpen}
        textIndex = {textIndex}
      />
      <Snackbar 
        snack={snack}
        setSnack={setSnack}
      />
      <DialogWindow
        records={records}
        item={item}
        textIndex={textIndex}
        setTextIndex={setTextIndex}
        openDialog={openDialog} 
        setOpenDialog={setOpenDialog} 
        setRecords={setRecords}
      />
    </div>
  );
}

export default Table;
