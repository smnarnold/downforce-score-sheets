import { useState, useEffect, createContext } from "react";
import i18n from "../data/i18n.json";
import _get from 'lodash/get';

enum SupportedLanguages {
  en = "en",
  fr = "fr",
  es = "es",
  de = "de",
};

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
  getTranslation: (key: SupportedLanguages) => {},
  onToggleLang: (language: SupportedLanguages) => {},
} as AppContextProps);

export const getBrowserLang = () => {
  const lang = (navigator.languages && navigator.languages[0]) || navigator.language;
  return lang.substring(0, 2).toLowerCase() ?? "en";
}

export const AppContextProvider = (props: any) => {
  const [theme, setTheme] = useState<string>("Classic");
  const browserLang = getBrowserLang();
  const defaultLang = browserLang in SupportedLanguages ? browserLang : "en";
  const [lang, setLang] = useState<string>(defaultLang);
  const [dictionary, setDictionary] = useState<object>(i18n[defaultLang as keyof typeof i18n]);

  // Initial page load only
  useEffect(() => {
    const storedLang: string | null = localStorage.getItem("lang");
    const storedTheme: string | null = localStorage.getItem("theme");

    if (storedLang && storedLang !== lang) updateLang(storedLang); // Not default language
    if (storedTheme && storedTheme !== theme) updateTheme(storedTheme); // Not default language
  }, []);

  useEffect(() => {
    document.title = getTranslationHandler('metaTitle');
    document.head.querySelector('meta[property="og:title"]')?.setAttribute('content', getTranslationHandler('metaTitle'));
    document.head.querySelector('meta[property="og:description"]')?.setAttribute('content', getTranslationHandler('metaDescription'));
    document.head.querySelector('meta[name="description"]')?.setAttribute('content', getTranslationHandler('metaDescription'));
  }, [lang]);

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
