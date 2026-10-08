import React, { createContext, useState, useContext, ReactNode } from 'react';

// กำหนด Type ให้กับข้อมูลภาษา
type LanguageContextType = {
  lang: 'th' | 'en';
  setLang: (lang: 'th' | 'en') => void;
};

// สร้าง Context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// สร้าง Provider สำหรับครอบแอป
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<'th' | 'en'>('th'); // ค่าเริ่มต้นเป็นภาษาไทย

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

// สร้าง Hook สำหรับเรียกใช้แบบง่ายๆ
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage ต้องถูกเรียกใช้ภายใน LanguageProvider');
  }
  return context;
};