import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Language } from '../translations/languages';

interface LanguageContextType {
  selectedLanguageCode: Language;
  setSelectedLanguageCode: (code: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedLanguageCode, setSelectedLanguageCode] = useState<Language>(() => {
    // Try to get the language from localStorage, fallback to 'en' if not found
    const savedLanguage = localStorage.getItem('selectedLanguage') as Language;
    return savedLanguage || 'en';
  });

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('selectedLanguage', selectedLanguageCode);
  }, [selectedLanguageCode]);
  
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
