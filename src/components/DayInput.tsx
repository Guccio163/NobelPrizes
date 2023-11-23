import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import React from 'react'

interface Props{
    handleChange: (event: { target: { value: string } }) => void;
    monthLen: number[];
    month: string;
    defaultValue: number;
    name: string;
}

export default function DayInput({handleChange, monthLen, month, defaultValue, name}:Props) {
  return (
    <FormControl fullWidth>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        Day
      </InputLabel>
      <NativeSelect
        defaultValue={defaultValue}
        inputProps={{
          name: name,
          id: "uncontrolled-native",
        }}
        onChange={handleChange}
      >
        {Array.from(
          { length: monthLen[parseInt(month)-1] },
          (_, index) => index + 1
        ).map((num) => (
          <option value={num}>{num}</option>
        ))}
      </NativeSelect>
    </FormControl>
  );
}
