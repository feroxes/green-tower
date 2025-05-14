import { useContext } from 'react';
import { LanguageContext } from '../../store/language-context/language-context';
import { Constants } from '../../utils/constants';
import { Lsi } from '../../lsi/lsi';

type LsiMap = Record<string, string>;
type LsiFn = (...args: any[]) => LsiMap;
type LsiInput<T> = {
  [K in keyof T]: T[K] extends LsiFn ? (...args: Parameters<T[K]>) => string : string;
};

export function useLsi<T extends Record<string, LsiMap | LsiFn>>(lsi: T = Lsi as any): LsiInput<T> {
  const { language } = useContext(LanguageContext);
  const defaultLang = Constants.lsi.defaultLanguage;

  const result = {} as LsiInput<T>;

  for (const key in lsi) {
    const entry = lsi[key];
    if (typeof entry === 'function') {
      result[key] = ((...args: any[]) => {
        const map = (entry as LsiFn)(...args);
        return map[language] ?? map[defaultLang] ?? '';
      }) as any;
    } else {
      result[key] = (entry[language] ?? entry[defaultLang] ?? '') as any;
    }
  }

  return result;
}
