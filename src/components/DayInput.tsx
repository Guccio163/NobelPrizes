import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import { useParams } from "react-router-dom";

interface Props {
  handleChange: (event: { target: { value: string } }) => void;
  monthLen: number[];
  month: string;
  defaultValue: number;
  name: string;
}

export default function DayInput({
  handleChange,
  monthLen,
  month,
  defaultValue,
  name,
}: Props) {
  const { paramLang } = useParams();

  const day = paramLang === "en" ? "Day" : paramLang == "no" ? "Dag" : "Dag";
  return (
    <FormControl fullWidth>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        {day}
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
          { length: monthLen[parseInt(month) - 1] },
          (_, index) => index + 1
        ).map((num) => (
          <option value={num}>{num}</option>
        ))}
      </NativeSelect>
    </FormControl>
  );
}
