import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import enTranslation from './locales/en.json';
import esTranslation from './locales/es.json';
import czTranslation from './locales/cz.json';
import skTranslation from './locales/sk.json';


// Language resources
const resources = {
    en: {
        translation: enTranslation,
    },
    es: {
        translation: esTranslation,
    },
    cz: {
        translation: czTranslation
    },
    sk: {
        translation: skTranslation
    }
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'en', // Set the default language here
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
