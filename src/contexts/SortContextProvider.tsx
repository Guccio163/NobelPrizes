import React, {
  PropsWithChildren,
  createContext,
  useState,
} from "react";

export const SortContext = createContext({
  sortParam: "default",
  setSortParam: (value: React.SetStateAction<string>) => console.log(value),
  sortDirection: -1,
  setSortDirection: (value: React.SetStateAction<number>) => console.log(value),
});

export default function SortContextProvider({ children }: PropsWithChildren) {
  const [sortParam, setSortParam] = useState("category");
  const [sortDirection, setSortDirection] = useState(-1);

  return (
    <SortContext.Provider
      value={{
        sortParam: sortParam,
        setSortParam: setSortParam,
        sortDirection: sortDirection,
        setSortDirection: setSortDirection,
      }}
    >
      {children}
    </SortContext.Provider>
  );
}
