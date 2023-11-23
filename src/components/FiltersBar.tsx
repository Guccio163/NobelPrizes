import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Slider from "@mui/material/Slider";
import React, { useContext, useState } from "react";
import { FilterDataContext } from "../contexts/FilterDataContextProvider";
import DateInputer from "./DateInputer";

interface Props {
  propYear: string;
}

export default function FiltersBar({ propYear }: Props) {
  const {
    filterCategories,
    filterAmount,
    setFilterAmount,
    filterCategoriesChosen,
    setFilterCategoriesChosen,
    filterDate,
  } = useContext(FilterDataContext);

  const [filterAmountBias, setFilterAmountBias] = useState(
    Math.round(filterAmount / 100) + 1
  );

  const handleAmountChange = (event: Event, newValue: number | number[]) => {
    setFilterAmount(Math.round((newValue as number) * filterAmountBias));
    console.log("filterAmount: ", filterAmount);
  };

  function amountText(value: number) {
    return `${value * filterAmountBias}`;
  }

  function handleCategoryChange(category: string, checked: boolean) {
    checked
      ? setFilterCategoriesChosen([...filterCategoriesChosen, category])
      : setFilterCategoriesChosen(
          filterCategoriesChosen.filter((categ) => categ != category)
        );
    console.log("dopping category...", filterCategoriesChosen);
  }

  const prizeMarks = [
    {
      value: 0,
      label: `${filterAmountBias * 0}`,
    },
    {
      value: 50,
      label: `${filterAmountBias * 50}`,
    },
    {
      value: 100,
      label: `${filterAmountBias * 100}`,
    },
  ];

  return (
    <div style={{ width: "20%", padding: "20px" }}>
      <p>Exclude categories:</p>
      {filterCategories.map((category) => (
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              checked={filterCategoriesChosen.includes(category)}
              onChange={(event, checked) =>
                handleCategoryChange(category, checked)
              }
            />
          }
          label={category}
        />
      ))}
      <DateInputer year={propYear} />
      <p>Max prize amount: {filterAmount}</p>
      <Slider
        getAriaLabel={() => "Prize amount range"}
        value={filterAmount / filterAmountBias}
        onChange={handleAmountChange}
        valueLabelDisplay="off"
        getAriaValueText={amountText}
        marks={prizeMarks}
      />
    </div>
  );
}
