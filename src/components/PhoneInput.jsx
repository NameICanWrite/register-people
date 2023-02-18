import React, {useState } from 'react';
import formatPhoneNumber from '../utils/formatPhoneNumber';
import {Input} from '@mui/material'

export default function PhoneInput({...props}) {
  const [inputValue, setInputValue] = useState('');

  const handleInput = (e) => {
    // this is where we'll call our future formatPhoneNumber function that we haven't written yet.
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    // we'll set the input value using our setInputValue
    setInputValue(formattedPhoneNumber);
  };

  return <div style={{position: 'relative'}}><span style={{position: 'absolute', bottom: '7px', fontSize:'17px'}}>+380</span><Input onChange={(e) => handleInput(e)} value={inputValue} {...props}/></div>;
}