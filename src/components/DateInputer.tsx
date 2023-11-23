import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import React, { useContext, useState } from "react";
import { FilterDataContext } from "../contexts/FilterDataContextProvider";

interface Props {
  year: string;
}

export default function DateInputer({ year }: Props) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthLen = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  monthLen[1] = parseInt(year) % 4 == 0 ? 29 : 28;

  const { filterDate, setFilterDate } = useContext(FilterDataContext);
  const [day1, setDay1] = useState("01");
  const [month1, setMonth1] = useState("01");
  const [day2, setDay2] = useState("31");
  const [month2, setMonth2] = useState("12");

  const handleDay1Change = (event: { target: { value: string } }) => {
    const intWithZero =
      parseInt(event.target.value) < 10
        ? `0${event.target.value}`
        : `${event.target.value}`;
    setDay1(intWithZero);
    setFilterDate([
      `${year}-${month1}-${intWithZero}`,
      `${year}-${month2}-${day2}`,
    ]);
    console.log(filterDate);
  };

  const handleMonth1Change = (event: { target: { value: string } }) => {
    const intWithZero =
      parseInt(event.target.value) < 10
        ? `0${event.target.value}`
        : `${event.target.value}`;
    setMonth1(intWithZero);

    setFilterDate([
      `${year}-${intWithZero}-${day1}`,
      `${year}-${month2}-${day2}`,
    ]);
  };

  const handleDay2Change = (event: { target: { value: string } }) => {
    const intWithZero =
      parseInt(event.target.value) < 10
        ? `0${event.target.value}`
        : `${event.target.value}`;
    setDay2(intWithZero);

    setFilterDate([
      `${year}-${month1}-${day1}`,
      `${year}-${month2}-${intWithZero}`,
    ]);
  };

  const handleMonth2Change = (event: { target: { value: string } }) => {
    const intWithZero =
      parseInt(event.target.value) < 10
        ? `0${event.target.value}`
        : `${event.target.value}`;
    setMonth2(intWithZero);
    setFilterDate([
      `${year}-${month1}-${day1}`,
      `${year}-${intWithZero}-${day2}`,
    ]);
  };

  return (
    <>
      <p>Start filter date: {filterDate[0]}</p>

      <div style={{ display: "flex", flexDirection: "row" }}>
        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Month
          </InputLabel>
          <NativeSelect
            defaultValue={0}
            inputProps={{
              name: "day1",
              id: "uncontrolled-native",
            }}
            onChange={handleMonth1Change}
          >
            {Array.from({ length: 12 }, (_, index) => index + 1).map((num) => (
              <option value={num}>{months[num - 1]}</option>
            ))}
          </NativeSelect>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Day
          </InputLabel>
          <NativeSelect
            defaultValue={1}
            inputProps={{
              name: "month1",
              id: "uncontrolled-native",
            }}
            onChange={handleDay1Change}
          >
            {Array.from({ length: monthLen[parseInt(month1)] }, (_, index) => index + 1).map((num) => (
              <option value={num}>{num}</option>
            ))}
          </NativeSelect>
        </FormControl>
      </div>
      <p>End filter date: {filterDate[1]}</p>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Month
          </InputLabel>
          <NativeSelect
            defaultValue={12}
            inputProps={{
              name: "day2",
              id: "uncontrolled-native",
            }}
            onChange={handleMonth2Change}
          >
            {Array.from({ length: 12 }, (_, index) => index + 1).map((num) => (
              <option value={num}>{months[num - 1]}</option>
            ))}
          </NativeSelect>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Day
          </InputLabel>
          <NativeSelect
            defaultValue={31}
            inputProps={{
              name: "month2",
              id: "uncontrolled-native",
            }}
            onChange={handleDay2Change}
          >
            {Array.from(
              { length: monthLen[parseInt(month2) - 1] },
              (_, index) => index + 1
            ).map((num) => (
              <option value={num}>{num}</option>
            ))}
          </NativeSelect>
        </FormControl>
      </div>
    </>
  );
}
