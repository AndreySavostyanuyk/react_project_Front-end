import React, { useState } from 'react';
import { Input, NativeSelect } from '@material-ui/core'; 
import Add from '../../../source/images/Add.svg';
import './Sorting.scss';

const Sorting = ({ setFlag, flag, setData, data, setFlagFilter }) => {
  const [textSort, setTextSort] = useState('');
  const arraySortName = [
    "Name",
    "Doctor",
    "Date"
  ];
  const arraySortDirection = [
    "Asc",
    "Desc"
  ];

  const compareNames = (event) => {
    setFlag(true)
    setTextSort(event);
  
    if (!event){
      setFlag(false);
    } 
  }

  const compareDirection = (event) => {

    if (textSort === "Name") {
      if (event === "Asc") {
        const arr = data.sort(compareNamesDesk);
        setData([...arr]);
      }
  
      if (event === "Desc") {
        const arr = data.sort(compareNamesAsk);
        setData([...arr]);
      }
    } else if (textSort === "Doctor") {
      if (event === "Asc") {
        const arr = data.sort(compareDoctorDesk);
        setData([...arr]);
      }
  
      if (event === "Desc") {
        const arr = data.sort(compareDoctorAsk);
        setData([...arr]);
      }
    } else if (textSort === "Date") {
      if (event === "Asc") {
        const arr = data.sort(compareDateDesk);
        setData([...arr]);
      }
  
      if (event === "Desc") {
        const arr = data.sort(compareDateAsk);
        setData([...arr]);
      }
    } 
  }

  const compareNamesAsk = (a, b) => {
    if ( a.name > b.name ){
      return -1;
    }
    if ( a.name < b.name ){
      return 1;
    }
    return 0;
  }
  
  const compareNamesDesk = (a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }
  
  const compareDoctorAsk = (a, b) => {
    if (a.doctor > b.doctor) {
      return -1;
    }
    if (a.doctor < b.doctor) {
      return 1;
    }
    return 0;
  }
  
  const compareDoctorDesk = (a, b) => {
    if (a.doctor < b.doctor) {
      return -1;
    }
    if (a.doctor > b.doctor) {
      return 1;
    }
    return 0;
  }
  
  const compareDateAsk = (a, b) => {
    if (a.date > b.date) {
      return -1;
    }
    if (a.date < b.date) {
      return 1;
    }
    return 0;
  }
  
  const compareDateDesk = (a, b) => {
    if (a.date < b.date) {
      return -1;
    }
    if (a.date > b.date) {
      return 1;
    }
    return 0;
  }

  const handleClickOpenFilter = () => {
    setFlagFilter(true);
  }

  return (
    <div>
      <div className="item_sort">
        <span>Сортировать по:</span>
        <NativeSelect
          className="sortby"
          id="demo-customized-select-native"
          onChange={(e) => compareNames(e.target.value)}
          input={<Input />}>
          <option aria-label="None" value="" />
          { arraySortName.map((value, index) => {
            return (
              <option value={value}>{value}</option>
            )
          })
          }
        </NativeSelect>
          { textSort && 
            <div className="direction">
              <span>Направление:</span>
              <NativeSelect
                id="demo-customized-select-native"
                onChange={(e) => compareDirection(e.target.value)}
                // value={age}
                // onChange={handleChange}
                input={<Input />}>
                <option aria-label="None" defaultValue="" />
                { arraySortDirection.map((value, index) => {
                  return (
                    <option value={value}>{value}</option>
                  )
                })
                }
              </NativeSelect>  
            </div>
          }
          <div className="item_addFilter__date">
            <span>Добавить фильтр по дате:</span>
            <img 
              src={Add} 
              onClick={() => handleClickOpenFilter() }
            />
          </div>
      </div>  
    </div>
  );
}

export default Sorting;