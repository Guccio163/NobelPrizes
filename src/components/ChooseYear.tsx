import React, { SetStateAction, useContext, useState } from "react";
import { LanguageContext } from "../contexts/LanguageContextProvider";
import eng_logo from "../assets/english.png";
import no_logo from "../assets/norway.png";
import se_logo from "../assets/swedish.png";
import { Button, colors } from "@mui/material";

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
