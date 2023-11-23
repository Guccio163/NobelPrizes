import { FormControl, InputLabel, NativeSelect } from '@mui/material';
import React from 'react'

interface Props{
    handleChange: (event: { target: { value: string } }) => void;
    months: string[];
    defaultValue: number
}

export default function DateInput({months, handleChange, defaultValue}:Props) {
  return (
    <FormControl fullWidth>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        Month
      </InputLabel>
      <NativeSelect
        defaultValue={defaultValue}
        inputProps={{
          name: "day1",
          id: "uncontrolled-native",
        }}
        onChange={handleChange}
      >
        {Array.from({ length: 12 }, (_, index) => index + 1).map((num) => (
          <option value={num}>{months[num - 1]}</option>
        ))}
      </NativeSelect>
    </FormControl>
  );
}
