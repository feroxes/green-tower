import { useContext } from 'react';
import { LanguageContext } from '../context/language-context/language-context';
import { Constants } from '../helpers/constants';
import { Lsi } from '../lsi/lsi';

export const useLsi = (lsi: Record<string, Record<string, string>> = Lsi) => {
  const { language } = useContext(LanguageContext);

  return Object.keys(lsi).reduce(
    (acc, key) => {
      acc[key] = lsi[key][language] || lsi[key][Constants.lsi.defaultLanguage];
      return acc;
    },
    {} as Record<string, string>,
  );
};
