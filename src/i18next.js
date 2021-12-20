import i18n from "i18next";
import {initReactI18next} from 'react-i18next';
import translationEN from './locales/en/translation_en.json'
import enumEN from './locales/en/enum_en.json'
import translationTR from './locales/tr/translation_tr.json'
import enumTR from './locales/tr/enum_tr.json'

const resources = {
    en: {
        translation: translationEN,
        enums: enumEN
    },
    tr: {
        translation: translationTR,
        enums: enumTR
    }
}

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "tr",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
