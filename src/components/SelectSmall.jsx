import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch } from 'react-redux';
import { setxValue } from '../actions/radiusActions';


export default function SelectSmall() {
    const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setxValue(event.target.value))
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small" >
      <InputLabel id="demo-select-small-label">X</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        
        label="Age"
        onChange={handleChange}
        
      >
        <MenuItem value={-3}>-3</MenuItem>
        <MenuItem value={-2}>-2</MenuItem>
        <MenuItem value={-1}>-1</MenuItem>
        <MenuItem value={0}>0</MenuItem>
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={5}>5</MenuItem>
      </Select>
    </FormControl>
  );
}