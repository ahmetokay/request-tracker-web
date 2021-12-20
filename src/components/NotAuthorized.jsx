import React from "react";
import {useTranslation} from "react-i18next";
import notAuthorized from '../images/403.png'

function NotAuthorized() {

    const {t} = useTranslation();

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Empty Page</h5>
                    <p>Use this page to start from scratch and place your custom content.</p>

                    <img className="" src={notAuthorized} />

                    <div className="p-text-bold page-error">{t('common.changeLanguage')}</div>
                </div>
            </div>
        </div>
    );
}

export default NotAuthorized
