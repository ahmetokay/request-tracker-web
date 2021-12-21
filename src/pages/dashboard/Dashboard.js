import React, {useEffect} from 'react';
import {useTranslation} from "react-i18next";

export const Dashboard = () => {

    const {t} = useTranslation();

    useEffect(() => {
    }, []);

    return (
        <div className="grid">
            <div className="col-12">
                <h2>{t('menu.dashboard')}</h2>

                <div className="card">
                    MINA MINA
                </div>
            </div>
        </div>
    );
}