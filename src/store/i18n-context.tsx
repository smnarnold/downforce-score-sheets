import { useState, useEffect, createContext } from "react";
import i18n from "../data/i18n.json";

interface LangContextProps {
  lang: string;
  i18n: any;
  dictionary: any;
  get: (key: string) => string;
  onToggleLang: (key: string) => void;
}

const LangContext = createContext({
  lang: "en",
  i18n: i18n,
  dictionary: {},
  get: (key: string) => {},
  onToggleLang: (language: string) => {},
} as LangContextProps);

export const LangContextProvider = (props: any) => {
  const [lang, setLang] = useState<string>("en");
  const [dictionary, setDictionary] = useState<object>(i18n["en"]);

  useEffect(() => {
    const storedLang: string | null = localStorage.getItem("lang");
    if (storedLang) {
      setLang(storedLang);
      setDictionary(i18n[storedLang as keyof typeof i18n]);
    }
  }, []);

  const toggleLangHandler = (language: string) => {
    setLang(language);
    setDictionary(i18n[language as keyof typeof i18n]);
    localStorage.setItem("lang", language);
  };

  const getTranslationHandler = (key: string): string => {
    return dictionary[key as keyof typeof dictionary];
  };

  return (
    <LangContext.Provider
      value={{
        lang: lang,
        i18n: i18n,
        dictionary: dictionary,
        get: getTranslationHandler,
        onToggleLang: toggleLangHandler,
      }}
    >
      {props.children}
    </LangContext.Provider>
  );
};

export default LangContext;
