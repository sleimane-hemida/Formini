import en from './en.json';
import fr from './fr.json';
import ar from './ar.json';

const LANGS = { en, fr, ar };

export function useTranslation(lang = 'fr') {
  // On peut améliorer pour détecter dynamiquement la langue
  const t = (key) => {
    const keys = key.split('.');
    let value = LANGS[lang];
    for (const k of keys) {
      if (value && typeof value === 'object') value = value[k];
      else return key;
    }
    return value || key;
  };
  return { t };
}
