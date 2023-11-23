import React, { createContext, useContext, useEffect, useState } from "react";
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
  filterAmount: 0,
  setFilterAmount: (value: React.SetStateAction<number>) => console.log(value),
  filterCategories: ["category"],
  setFilterCategories: (value: React.SetStateAction<string[]>) =>
    console.log(value),
  filterCategoriesChosen: ["category"],
  setFilterCategoriesChosen: (value: React.SetStateAction<string[]>) =>
    console.log(value),
  filterAmountBias: 0
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
  const filterAm = Math.max(
    ...preFilteredData.map((prize: Prize) => prize.prizeAmount)
  );
  const [filterAmount, setFilterAmout] = useState(filterAm);
  const [filterCategories, setFilterCategories] = useState(
    preFilteredData.map((prize: Prize) => langCategoryEn(prize.category))
  );
  const [filterCategoriesChosen, setFilterCategoriesChosen] = useState(
    preFilteredData.map((prize: Prize) => langCategoryEn(prize.category))
  );
  const [filterAmountBias, setFilterAmountBias] = useState(
    Math.round(filterAmount / 100) + 1
  );

  // UseEffect added for reevaluating data when page inputet by hand, data like to load before useStates are evaluated
  useEffect(() => {
    const amountTemp = Math.max(
      ...preFilteredData.map((prize: Prize) => prize.prizeAmount)
    );
    setFilterCategories(
      preFilteredData.map((prize: Prize) => langCategoryEn(prize.category))
    );
    setFilterAmout(
      amountTemp
    );
    setFilterCategoriesChosen(
      preFilteredData.map((prize: Prize) => langCategoryEn(prize.category))
    );
    setFilterAmountBias(Math.round(amountTemp / 100) + 1);
    console.log("DATA REFRESHED");
  }, [data]);

  const filteredData = preFilteredData
    .filter((prize: Prize) => prize.prizeAmount <= filterAmount)
    .filter((prize: Prize) =>
      filterCategoriesChosen.includes(langCategoryEn(prize.category))
    )
    .filter(
      (prize: Prize) =>
        (prize.dateAwarded >= filterDate[0] && prize.dateAwarded <= filterDate[1]) || !prize.dateAwarded
    );
    // JEŻELI CHCEMY MIEĆ ODSIANE TEŻ TECORDY Z NIEZNANYMI DATAMI USUWAMY TĄ KOŃCÓWKĘ "|| !prize.dateAwarded"
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
        filterAmountBias : filterAmountBias
      }}
    >
      {children}
    </FilterDataContext.Provider>
  );
}
