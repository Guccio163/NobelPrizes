import React, {
  Children,
  PropsWithChildren,
  createContext,
  useState,
} from "react";

export const LanguageContext = createContext({
  language: 'default',
  setLanguage: (value: React.SetStateAction<string>) => console.log(value),
});

export default function LanguageContextProvider({
  children,
}: PropsWithChildren) {

  const [lang, setLang] = useState("en");

  return (
    <LanguageContext.Provider value={{language: lang, setLanguage: setLang }}>{children}</LanguageContext.Provider>
  );
}
