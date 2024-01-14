import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import RNLanguageDetector from '@os-team/i18next-react-native-language-detector';
import { en, vi } from './locales';

const resources = {
  en,
  vi,
};

void i18n
  .use(RNLanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    compatibilityJSON: 'v3',
  });

export default i18n;
