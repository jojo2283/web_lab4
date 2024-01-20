import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useDispatch } from 'react-redux';
import { setNewRadius } from '../actions/radiusActions';

export default function RadioRadius() {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setNewRadius(event.target.value))
  };
  return (
    <FormControl size='small'>
      <FormLabel id="demo-radio-buttons-group-label">Choose R value</FormLabel>
      <RadioGroup
      row
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue=""
        
        name="radio-buttons-group"
        onChange={handleChange}
      >
        <FormControlLabel value="-3" control={<Radio size="small" />} label="-3" labelPlacement="bottom" />
        <FormControlLabel value="-2" control={<Radio size="small" />} label="-2" labelPlacement="bottom" />
        <FormControlLabel value="-1" control={<Radio size="small" />} label="-1" labelPlacement="bottom" />
        <FormControlLabel value="0" control={<Radio size="small" />} label="0" labelPlacement="bottom" />
        <FormControlLabel value="1" control={<Radio size="small" />} label="1" labelPlacement="bottom" />
        <FormControlLabel value="2" control={<Radio size="small" />} label="2" labelPlacement="bottom" />
        <FormControlLabel value="3" control={<Radio size="small" />} label="3" labelPlacement="bottom" />
        <FormControlLabel value="4" control={<Radio size="small" />} label="4" labelPlacement="bottom" />
        <FormControlLabel value="5" control={<Radio size="small" />} label="5" labelPlacement="bottom" />
      </RadioGroup>
    </FormControl>
  );
}
