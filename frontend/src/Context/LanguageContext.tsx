 import React, { createContext, useContext, useState } from "react";

interface LanguageContextType {
  selectedLang: string;
  setSelectedLang: (lang: string) => void;
  translations: { [key: string]: string };
  setTranslations: (t: { [key: string]: string }) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedLang, setSelectedLang] = useState("EN");
  const [translations, setTranslations] = useState<{ [key: string]: string }>({});

  return (
    <LanguageContext.Provider value={{ selectedLang, setSelectedLang, translations, setTranslations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
