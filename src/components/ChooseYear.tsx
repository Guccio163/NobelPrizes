import React, { SetStateAction } from "react";
import { Button } from "@mui/material";

interface Props {
  year: number;
  selectedYear: number;
  setYear: React.Dispatch<SetStateAction<number>>;
}

export default function ChooseYear({ year, selectedYear, setYear }: Props) {
  const isSelected = selectedYear == year;
  const buttonClasses = `yearButton ${isSelected ? "chosenYear" : null}`;

  return (
    <Button
      onClick={() => {
        setYear(year);
      }}
      className={buttonClasses}
      sx={{
        borderRadius: 1,
        fontSize: isSelected ? 22 : 17,
      }}
    >
      {year}
    </Button>
  );
}
