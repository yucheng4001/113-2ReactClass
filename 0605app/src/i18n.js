import i18n, { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';   

import en from './locales/en.json';
import zh from './locales/zh_TW.json';
import es from './locales/es.json'; 
import jp from './locales/jp.json';
import ru from './locales/ru.json';

const resources = {
  en: { translation: en },
  zh: { translation: zh },
  es: { translation: es },
  jp: { translation: jp },
  ru: { translation: ru },
};

i18n.use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'zh_TW', // default language
    fallbackLng: 'en', // fallback language
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

  export default i18n;