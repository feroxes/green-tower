import { useContext } from 'react';
import { LanguageContext } from '../../store/language-context/language-context';

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within an LanguageProvider');
  }
  return context;
};
