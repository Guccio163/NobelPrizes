import TableBody from "@mui/material/TableBody";
import { useContext } from "react";
import { Prize } from "../pages/MainPage";
import { SortContext } from "../contexts/SortContextProvider";
import { useParams } from "react-router-dom";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { FilterDataContext } from "../contexts/FilterDataContextProvider";

export default function CustomTableBody() {
  const { sortParam, sortDirection } = useContext(SortContext);
  const { paramLang } = useParams();
  const { filteredData } = useContext(FilterDataContext);

  const langCategory = (category: Object) => {
    const xd = paramLang as keyof typeof category;
    return `${category[xd]}`;
  };

  const getCompareValue = (p: Prize) => {
    const prizeParam = sortParam as keyof typeof p;
    return sortParam == "category"
      ? langCategory(p[prizeParam])
      : p[prizeParam];
  };

  const sortFunction = (n1: Prize, n2: Prize) => {
    if (getCompareValue(n1) > getCompareValue(n2)) {
      return sortDirection * 1;
    } else if (getCompareValue(n1) < getCompareValue(n2)) {
      return sortDirection * -1;
    } else {
      return 0;
    }
  };

  return (
    <>
      <TableBody>
        {filteredData
          .sort(sortFunction)
          .map((row, index) => (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              key = {index}
            >
              <TableCell component="th" scope="row">
                {row.awardYear}
              </TableCell>
              <TableCell align="right">{row.dateAwarded}</TableCell>
              <TableCell align="right">
                {row.prizeAmount.toLocaleString()}
              </TableCell>
              <TableCell align="right">{langCategory(row.category)}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </>
  );
}
