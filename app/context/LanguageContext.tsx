"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Lang = "en" | "hi" | "pa";

type LanguageContextType = {
  language: Lang;
  setLanguage: (lang: Lang) => void;
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
});

export function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [language, setLanguageState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("language") as Lang | null;
    if (saved) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Lang) => {
    localStorage.setItem("language", lang);
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);