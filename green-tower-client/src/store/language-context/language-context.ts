import { createContext } from 'react';
import { Constants } from '../../utils/constants';
import { SupportedLanguages } from '../../types/types';

export const LanguageContext = createContext({
  language: Constants.lsi.defaultLanguage,
  setLanguage: (lang: SupportedLanguages) => {},
});
