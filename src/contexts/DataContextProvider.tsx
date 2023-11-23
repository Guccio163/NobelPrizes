import { PropsWithChildren, createContext, useEffect, useState } from "react";
import axios from "axios";
import { Prize } from "../pages/MainPage";

export const DataContext = createContext({
  data: [
    {
      id: 0,
      awardYear: "1901",
      category: {},
      dateAwarded: "some date",
      prizeAmount: 100,
    },
  ],
  yearList: [2137],
});

function uniqueFilter(value: number, index: number, self: number[]) {
  return self.indexOf(value) === index;
}

export default function DataContextProvider({ children }: PropsWithChildren) {
  const [yearList, setYearList] = useState<number[]>([]);
  const [data, setData] = useState<Prize[]>([]);

  const getDistinctYears = (nobelPrizes: Prize[]) => {
    const yearsDistinct = nobelPrizes.map((prize: Prize) =>
      new Date(prize.dateAwarded).getFullYear()
    );
    const filteredArray = yearsDistinct.filter(uniqueFilter);
    return filteredArray;
  };

  const fetchData = async () => {
    try {
      let response = await axios.get(
        "https://api.nobelprize.org/2.1/nobelPrizes"
      );
      console.log("data requested");
      return response.data.nobelPrizes;
    } catch (error) {
      console.error("Błąd podczas pobierania danych", error);
    }
  };

  useEffect(() => {
    (async () => {
      const nobelPrizes = await fetchData();
      const distinctYears = getDistinctYears(nobelPrizes);
      setData(nobelPrizes);
      setYearList(distinctYears);
    })();
  }, []);

  return (
    <DataContext.Provider value={{ data: data, yearList: yearList }}>
      {children}
    </DataContext.Provider>
  );
}
