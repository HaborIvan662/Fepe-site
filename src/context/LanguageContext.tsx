import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

interface LanguageContextType {
  selectedLanguageCode: string;
  setSelectedLanguageCode: (code: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedLanguageCode, setSelectedLanguageCode] = useState('en');
  
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
