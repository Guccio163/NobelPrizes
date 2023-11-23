import React, {
  createContext,
  useContext,
  useState,
} from "react";
import { Prize } from "../pages/MainPage";
import { DataContext } from "./DataContextProvider";

const langCategoryEn = (category: Object) => {
  const xd = "en" as keyof typeof category;
  return `${category[xd]}`;
};

export const FilterDataContext = createContext({
  filteredData: [
    {
      id: 0,
      awardYear: "1901",
      category: {},
      dateAwarded: "some date",
      prizeAmount: 100,
    },
  ],
  filterDate: ["string", "string"],
  setFilterDate: (value: React.SetStateAction<string[]>) => console.log(value),
  filterAmount: 100000,
  setFilterAmount: (value: React.SetStateAction<number>) => console.log(value),
  filterCategories: ["category"],
  setFilterCategories: (value: React.SetStateAction<string[]>) =>
    console.log(value),
  filterCategoriesChosen: ["category"],
  setFilterCategoriesChosen: (value: React.SetStateAction<string[]>) =>
    console.log(value),
});

interface Props {
  children: React.ReactNode;
  paramYear: string;
}

export default function FilterDataContextProvider({
  children,
  paramYear,
}: Props) {
  const { data } = useContext(DataContext);
  const [filterDate, setFilterDate] = useState([
    `${paramYear}-01-01`,
    `${paramYear}-12-31`,
  ]);

  const preFilteredData = data.filter(
    (prize: Prize) => prize.awardYear === paramYear
  );

  const [filterAmount, setFilterAmout] = useState(
    Math.max(...preFilteredData.map((prize: Prize) => prize.prizeAmount))
  );

  const [filterCategories, setFilterCategories] = useState(
    preFilteredData.map((prize: Prize) => langCategoryEn(prize.category))
  );

  const [filterCategoriesChosen, setFilterCategoriesChosen] = useState(
    preFilteredData.map((prize: Prize) => langCategoryEn(prize.category))
  );

  const filteredData = preFilteredData
    .filter((prize: Prize) => prize.prizeAmount <= filterAmount)
    .filter((prize: Prize) =>
      filterCategoriesChosen.includes(langCategoryEn(prize.category))
    )
    .filter((prize: Prize) => 
      prize.dateAwarded >= filterDate[0] && prize.dateAwarded <= filterDate[1]
    );

  return (
    <FilterDataContext.Provider
      value={{
        filteredData: filteredData,
        filterDate: filterDate,
        setFilterDate: setFilterDate,
        filterAmount: filterAmount,
        setFilterAmount: setFilterAmout,
        filterCategories: filterCategories,
        setFilterCategories: setFilterCategories,
        filterCategoriesChosen: filterCategoriesChosen,
        setFilterCategoriesChosen: setFilterCategoriesChosen,
      }}
    >
      {children}
    </FilterDataContext.Provider>
  );
}
