import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setyValue } from '../actions/radiusActions';
import { setUserData } from '../actions/userActions';
import SelectSmall from './SelectSmall';
import { Button, TextField } from '@mui/material';
import RadioRadius from './RadioRadius';
import { DeleteOutline, Send } from '@mui/icons-material'
import '../index.css'

const FormComponent = () => {
  const xValue = useSelector(state => state.radius.xValue);
  const yValue = useSelector(state => state.radius.yValue);
  const [errors, setErrors] = useState({});
  const userId = useSelector(state => state.user.userId);
  const radius = useSelector(state => state.radius.radius);
  const dispatch = useDispatch();
  const safeYValue = yValue ?? '';
  const token = sessionStorage.getItem('token')



  const validate = () => {
    let isValid = true;
    let errors = {};
    if (xValue !== 0) {
      if (!xValue) {
        errors.x = 'Choose value for X.';
        isValid = false;
      }
    }
    if (!radius) {
      errors.radius = 'Choose value for Radius.';
      isValid = false;
    }

    const yNum = parseFloat(yValue);
    if (isNaN(yNum) || yNum < -5 || yNum > 3) {
      errors.y = 'Enter number for Y in range from -5 to 3.';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };



  const handleYChange = (event) => {
    dispatch(setyValue(event.target.value))
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      const url = 'http://localhost:8080/hits';
      const queryParams = { userId: userId };
      const requestBody = { x: Number(xValue), y: Number(yValue), r: Number(radius) };
      const urlWithParams = new URL(url);
      Object.keys(queryParams).forEach(key => urlWithParams.searchParams.append(key, queryParams[key]));


      await fetch(urlWithParams.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(requestBody),
      });


      const response = await fetch('http://localhost:8080/users?id=' + userId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token


        },


      });

      if (response.status === 403) {
        console.error('Invalid token ');
      }

      const data = await response.json();

      dispatch(setUserData(data.hitsList));
      sessionStorage.setItem('userData', JSON.stringify(data.hitsList));
    }
  };

  const clearTable = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:8080/hits/' + userId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },

    });
    if (response.status === 403) {
      console.error('Invalid token ');
    }
    else {
      if (response.status === 200) {
        if (response) {
          dispatch(setUserData([]));
          sessionStorage.setItem('userData', [])
        }
      }
    }

  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <SelectSmall />
        {errors.x && <div style={{ color: 'red' }}>{errors.x}</div>}
      </div>
      <div>

        <TextField id="standard-basic" label="Y [-5;3]" variant="standard"
          value={safeYValue} onChange={handleYChange} />

        {errors.y && <div style={{ color: 'red' }}>{errors.y}</div>}
      </div>
      <div style={{ margin: '15px 0px 10px 0pxн' }}>

        <RadioRadius />
        {errors.radius && <div style={{ color: 'red' }}>{errors.radius}</div>}
      </div>
      <div className='hit-buttons'>
        <Button
          type='submit'
          variant="outlined"
          endIcon={<Send />}
        >Submit</Button>
        <Button
          variant="outlined"
          endIcon={<DeleteOutline />}
          onClick={clearTable}>
          Delete
        </Button>
      </div>
    </form>
  );
};

export default FormComponent;
