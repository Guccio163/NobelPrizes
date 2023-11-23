import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContextProvider";
import eng_logo from "../assets/english.png";
import no_logo from "../assets/norway.png";
import se_logo from "../assets/swedish.png";

interface Props {
  lang: string;
}

export default function ChooseLang({ lang }: Props) {
  const { language, setLanguage } = useContext(LanguageContext);

  const flagImage = lang === "en" ? eng_logo : lang == "no" ? no_logo : se_logo;

  const buttonClasses = `flagButton ${
    language == lang ? "lightened" : "shadowed"
  }`;

  return (
    <button
      onClick={() => {
        setLanguage(lang);
      }}
      className={buttonClasses}
    >
      <img src={flagImage} className="flagImage" />
    </button>
  );
}
