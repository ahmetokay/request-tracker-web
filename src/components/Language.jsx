import {Dropdown} from 'primereact/dropdown';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import { locale } from 'primereact/api';

function Language() {

    const {t, i18n} = useTranslation();
    const activeLang = {name: "Türkçe", code: "tr"};
    const [item, setItem] = useState(activeLang);
    const lang = [{name: "Türkçe", code: 'tr'}, {name: 'English', code: 'en'}];

    function onChange(lang) {
        setItem(lang.value);
        i18n.changeLanguage(lang.value.code);
        locale(lang.value.code)
    }

    return (
        <Dropdown value={item}
                  options={lang}
                  onChange={onChange}
                  optionLabel="name"/>
    );
}

export default Language;
