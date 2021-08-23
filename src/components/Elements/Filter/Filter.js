import React, { useState } from 'react';
import { Button,  TextField } from '@material-ui/core'; 
import Delete from '../../../source/images/delete.svg';
import './Filter.scss';

const Filter = ({ records, setData,  setFlag, flagFilter, setFlagFilter }) => {
  const [withDate, setWithDate] = useState('');
  const [onDate, setOnDate] = useState('');

  const handleChangeWithDate = (event) => {
    setWithDate(event);
  };

  const handleChangeOnDate = (event) => {
    setOnDate(event);
  };

  const handleClickCloseFilter = () => {
    setFlag(false)
    setFlagFilter(false);
    setData(records)
  }

  const handleClickFilter = () => {
    setFlag(true);
    const date = records.filter(isPrime);
    setData(date);
  }

  const isPrime = (a) => {
    if (onDate && withDate) {
      if (a.date > withDate && a.date < onDate) {
        console.log("chtozafignia")
        return true;
      }
    }

    if (withDate && !onDate){
      if (a.date > withDate) {
        return true;
      }
    }

    if (onDate && !withDate) {
      if (a.date < onDate) {
        return true;
      }
    }
  }

  return (
    <div>
      { flagFilter ?
        <div className="filter_date">
          <div className="item_date">
            <span>c:</span>
            <TextField
              id="outlined-basic" 
              onChange={(e) => handleChangeWithDate(e.target.value)}
              type="date"
              variant="outlined" 
            />
          </div>
          <div className="item_date">
          <span>по:</span>
            <TextField 
              id="outlined-basic" 
              onChange={(e) => handleChangeOnDate(e.target.value)}
              type="date"
              variant="outlined" 
            />
          </div>
          <Button variant="outlined" onClick={() => handleClickFilter()}>Фильтровать</Button>
          <img 
            src={Delete} 
            onClick={() => (handleClickCloseFilter())}
          />
        </div>
        :
        <div></div>
      }
    </div>
  );
}

export default Filter;