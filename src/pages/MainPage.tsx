import { SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContextProvider";
import ChooseLang from "../components/ChooseLang";
import { DataContext } from "../contexts/DataContextProvider";
import ChooseYear from "../components/ChooseYear";
import { Button, ButtonGroup } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export type Prize = {
  id: number;
  awardYear: string;
  category: Object;
  dateAwarded: string;
  prizeAmount: number;
};

export default function MainPage() {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const { yearList } = useContext(DataContext);
  const [year, setYear] = useState(0);

    const dictionary =
      language === "en"
        ? {
            welcome: "Hello, fellow BIT Web members",
            chooseYear: "Choose a year",
            checkAwards: `check the ${year} Nobel prizes`,
          }
        : language == "no"
        ? {
            welcome: "Hei, andre BIT Web-medlemmer",
            chooseYear: "Velg et år",
            checkAwards: `sjekk ${year} Nobelprisene`,
          }
        : {
            welcome: "Hej, andra BIT-webbmedlemmar",
            chooseYear: "Välj ett år",
            checkAwards: `kolla ${year} Nobelpriserna`,
          };

  const navi = () => {
    navigate(`/nagrody/${language}/${year}`);
  };

  return (
    <div className="mainDiv">
      <div className="flagDiv">
        <ChooseLang lang="en" />
        <ChooseLang lang="no" />
        <ChooseLang lang="se" />
      </div>
      <div
        style={{
          alignItems: "center",
          width: "100%",
          height: window.innerHeight * 0.8,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h1> {dictionary.welcome}! </h1>
        <ButtonGroup
          variant="text"
          aria-label="text button group"
          className="yearsList"
          style={{ width: "50%", justifyContent: "center", marginBottom: 30 }}
        >
          {yearList.map((object) => (
            <ChooseYear year={object} selectedYear={year} setYear={setYear} />
          ))}
        </ButtonGroup>

        <Button
          onClick={navi}
          disabled={year == 0}
          variant="outlined"
          style={{ width: "50%", alignSelf: "center" }}
          endIcon={<ArrowForwardIcon/>}
        >
          {year === 0 ? dictionary.chooseYear : dictionary.checkAwards}
        </Button>
      </div>
    </div>
  );
}
