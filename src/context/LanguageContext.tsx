import React, { createContext, useContext, useState } from 'react';
import type { Language } from '../translations/languages';

interface LanguageContextType {
  selectedLanguageCode: Language;
  setSelectedLanguageCode: (code: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedLanguageCode, setSelectedLanguageCode] = useState<Language>('en');
  
  return (
    <LanguageContext.Provider value={{ selectedLanguageCode, setSelectedLanguageCode }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
