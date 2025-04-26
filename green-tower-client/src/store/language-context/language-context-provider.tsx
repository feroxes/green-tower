import { FC, ReactNode, useState } from 'react';
import { LanguageContext } from './language-context';
import { Constants } from '../../utils/constants';
import { LocalStorage } from '../../utils/local-storage';
import { SupportedLanguages } from '../../types/types';

export const LanguageProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    let lang = LocalStorage.getItem<SupportedLanguages>(Constants.localStorage.language);
    if (lang) {
      return lang;
    }
    const browserLang = navigator.language.split('-')[0] as SupportedLanguages;
    lang = Constants.lsi.supportedLanguages.includes(browserLang) ? browserLang : Constants.lsi.defaultLanguage;
    LocalStorage.setItem(Constants.localStorage.language, lang);
    return lang;
  });

  function _setLanguage(lang: SupportedLanguages) {
    LocalStorage.setItem(Constants.localStorage.language, lang);
    setLanguage(lang);
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: _setLanguage }}>{children}</LanguageContext.Provider>
  );
};
