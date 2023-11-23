import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import React, { useContext } from 'react'
import { SortContext } from '../contexts/SortContextProvider';
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Prize } from '../pages/MainPage';

interface Props {
    name: string
    nameAdjusted: string
}

export default function CustomTableCell({name, nameAdjusted}:Props) {

const {sortParam, setSortParam, sortDirection, setSortDirection} = useContext(SortContext);

  return (
    <TableCell align="right">
      <Button
        style={{ backgroundColor: "rgba(172, 172, 172, 0.14)", color: "black" }}
        onClick={() => {
          setSortDirection((sortDirection) => sortDirection * -1);
          setSortParam(name);
        }}
        startIcon={
          sortParam == name ? (
            sortDirection == -1 ? (
              <ArrowDownwardIcon />
            ) : (
              <ArrowUpwardIcon />
            )
          ) : null
        }
        variant="text"
      >
        {nameAdjusted}
      </Button>
    </TableCell>
  );
}
