import { useState, useEffect, createContext } from "react";
import i18n from "../data/i18n.json";
import _get from 'lodash/get';

interface AppContextProps {
  theme: string;
  onToggleTheme: (key: string) => void;
  lang: string;
  i18n: any;
  dictionary: any;
  getTranslation: (key: string) => string;
  onToggleLang: (key: string) => void;
}

const AppContext = createContext({
  theme: 'Regular',
  onToggleTheme: (theme: string) => {},
  lang: "en",
  i18n: i18n,
  dictionary: {},
  getTranslation: (key: string) => {},
  onToggleLang: (language: string) => {},
} as AppContextProps);

export const AppContextProvider = (props: any) => {
  const [theme, setTheme] = useState<string>("classic");
  const [lang, setLang] = useState<string>("en");
  const [dictionary, setDictionary] = useState<object>(i18n["en"]);

  useEffect(() => {
    const storedLang: string | null = localStorage.getItem("lang");
    const storedTheme: string | null = localStorage.getItem("theme");

    if (storedLang && storedLang !== lang) updateLang(storedLang); // Not default language
    if (storedTheme && storedTheme !== theme) updateTheme(storedTheme); // Not default language
  }, []);

  const updateLang = (language: string) => {
    setLang(language);
    setDictionary(i18n[language as keyof typeof i18n]);
    document.documentElement.lang = language;
  };

  const toggleLangHandler = (language: string) => {
    updateLang(language);
    localStorage.setItem("lang", language);
  };

  const getTranslationHandler = (key: string): string => {
    return _get(dictionary, key);
  };

  const toggleThemeHandler = (theme: string) => {
    updateTheme(theme);
    localStorage.setItem("theme", theme);
  };

  const updateTheme = (theme: string) => {
    setTheme(theme);
  };

  return (
    <AppContext.Provider
      value={{
        theme: theme,
        onToggleTheme: toggleThemeHandler,
        lang: lang,
        i18n: i18n,
        dictionary: dictionary,
        getTranslation: getTranslationHandler,
        onToggleLang: toggleLangHandler,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
