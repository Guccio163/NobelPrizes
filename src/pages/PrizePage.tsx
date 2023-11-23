import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, Slider } from "@mui/material";
import CustomTableCell from "../components/CustomTableCell";
import SortContextProvider from "../contexts/SortContextProvider";
import CustomTableBody from "../components/CustomTableBody";
import FiltersBar from "../components/FiltersBar";
import FilterDataContextProvider, { FilterDataContext } from "../contexts/FilterDataContextProvider";

export default function PrizePage() {
  const { paramLang, paramYear } = useParams();
  const navigate = useNavigate();

  const dictionary =
    paramLang === "en"
      ? {
          goBack: "Go back",
          awardYear: "Year",
          awardDate: "Date",
          awardAmount: "Amount awarded",
          awardCategory: "Category",
        }
      : paramLang == "no"
      ? {
          goBack: "Gå tilbake",
          awardYear: "År",
          awardDate: "Dato",
          awardAmount: "Tildelt beløp",
          awardCategory: "Kategori",
        }
      : {
          goBack: "Gå tillbaka",
          awardYear: "År",
          awardDate: "Datum",
          awardAmount: "Tilldelat belopp",
          awardCategory: "Kategori",
        };

  return (
    <div>
      <Button
        onClick={() => navigate(-1)}
        startIcon={<ArrowBackIcon />}
        variant="outlined"
      >
        {dictionary.goBack}
      </Button>
      <div
        style={{
          alignItems: "center",
          width: "100%",
          height: window.innerHeight * 0.8,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        <SortContextProvider>
          <FilterDataContextProvider paramYear={paramYear!}>
            <FiltersBar propYear={paramYear!}/>
            <TableContainer
              component={Paper}
              style={{ alignSelf: "center", width: "70%", marginLeft: "20px" }}
            >
              <Table sx={{ width: "100%" }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <CustomTableCell
                      name="awardYear"
                      nameAdjusted={dictionary.awardYear}
                    />
                    <CustomTableCell
                      name="dateAwarded"
                      nameAdjusted={dictionary.awardDate}
                    />
                    <CustomTableCell
                      name="prizeAmount"
                      nameAdjusted={dictionary.awardAmount}
                    />
                    <CustomTableCell
                      name="category"
                      nameAdjusted={dictionary.awardCategory}
                    />
                  </TableRow>
                </TableHead>
                <CustomTableBody />
              </Table>
            </TableContainer>
          </FilterDataContextProvider>
        </SortContextProvider>
      </div>
    </div>
  );
}
