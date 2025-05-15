import { useContext } from 'react';

import { Lsi } from '../../lsi/lsi';
import { LanguageContext } from '../../store/language-context/language-context';
import { Constants } from '../../utils/constants';

type LsiMap = Record<string, string>;
type LsiFn = (...args: never[]) => LsiMap;
type LsiInput<T> = {
  [K in keyof T]: T[K] extends LsiFn ? (...args: Parameters<T[K]>) => string : string;
};

export function useLsi<T extends Record<string, LsiMap | LsiFn>>(lsi: T = Lsi as never): LsiInput<T> {
  const { language } = useContext(LanguageContext);
  const defaultLang = Constants.lsi.defaultLanguage;

  const result = {} as LsiInput<T>;

  for (const key in lsi) {
    const entry = lsi[key];
    if (typeof entry === 'function') {
      result[key] = ((...args: never[]) => {
        const map = (entry as LsiFn)(...args);
        return map[language] ?? map[defaultLang] ?? '';
      }) as never;
    } else {
      result[key] = (entry[language] ?? entry[defaultLang] ?? '') as never;
    }
  }

  return result;
}
