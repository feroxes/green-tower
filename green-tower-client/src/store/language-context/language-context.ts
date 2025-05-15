import { createContext } from 'react';

import { SupportedLanguages } from '../../types/types';
import { Constants } from '../../utils/constants';

export const LanguageContext = createContext({
  language: Constants.lsi.defaultLanguage,
  setLanguage: (_lang: SupportedLanguages) => {},
});
