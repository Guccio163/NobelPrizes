import { useContext, useState } from "react";
import { FilterDataContext } from "../contexts/FilterDataContextProvider";
import MonthInput from "./MonthInput";
import DayInput from "./DayInput";
import { useParams } from "react-router-dom";

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

  const { paramLang } = useParams();

  const dictionary =
    paramLang === "en"
      ? {
          startDate: "From",
          endDate: "To",
        }
      : paramLang == "no"
      ? {
          startDate: "Fra",
          endDate: "Til",
        }
      : {
          startDate: "Från",
          endDate: "Till",
        };

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
      <p>{dictionary.startDate}: {filterDate[0]}</p>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <MonthInput
          months={months}
          handleChange={handleMonth1Change}
          defaultValue={0}
        />
        <DayInput
          handleChange={handleDay1Change}
          month={month1}
          monthLen={monthLen}
          defaultValue={1}
          name="day1"
        />
      </div>
      <p>{dictionary.endDate}: {filterDate[1]}</p>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <MonthInput
          months={months}
          handleChange={handleMonth2Change}
          defaultValue={12}
        />
        <DayInput
          handleChange={handleDay2Change}
          month={month2}
          monthLen={monthLen}
          defaultValue={31}
          name="day2"
        />
      </div>
    </>
  );
}
