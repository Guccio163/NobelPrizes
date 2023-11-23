import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Slider from "@mui/material/Slider";
import { useContext } from "react";
import { FilterDataContext } from "../contexts/FilterDataContextProvider";
import DateInputer from "./DateInputer";
import { useParams } from "react-router-dom";

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
    filterAmountBias,
  } = useContext(FilterDataContext);

  const { paramLang } = useParams();

  const dictionary =
    paramLang === "en"
      ? {
          startDate: "Go back",
          endDate: "Year",
          maxPrize: "Max prize amount",
          month: "Amount awarded",
          day: "Category",
        }
      : paramLang == "no"
      ? {
          startDate: "Gå tilbake",
          endDate: "År",
          maxPrize: "Maks premiebeløp",
          month: "Tildelt beløp",
          day: "Kategori",
        }
      : {
          startDate: "Gå tillbaka",
          endDate: "År",
          maxPrize: "Max prissumma",
          month: "Tilldelat belopp",
          day: "Kategori",
        };

  const handleAmountChange = (event: Event, newValue: number | number[]) => {
    setFilterAmount(Math.round((newValue as number) * filterAmountBias));
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
      <p>{dictionary.maxPrize}: {filterAmount}</p>
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
