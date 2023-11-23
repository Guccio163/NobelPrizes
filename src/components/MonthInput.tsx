import { FormControl, InputLabel, NativeSelect } from "@mui/material";
import { useParams } from "react-router-dom";

interface Props {
  handleChange: (event: { target: { value: string } }) => void;
  months: string[];
  defaultValue: number;
}

export default function DateInput({
  months,
  handleChange,
  defaultValue,
}: Props) {
  const { paramLang } = useParams();

  const month =
    paramLang === "en" ? "Month" : paramLang == "no" ? "Måned" : "Månad";
  return (
    <FormControl fullWidth>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        {month}
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
