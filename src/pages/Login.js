import React, {useRef, useState} from 'react';
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import AuthService from "../service/AuthService";
import {useHistory} from "react-router-dom";
import {Toast} from "primereact/toast";
import {useTranslation} from "react-i18next";

export const Login = (props) => {

    const {t} = useTranslation();
    const history = useHistory();
    const toast = useRef(null);

    const [username, setUsername] = useState('ahmet@ahmet.com');
    const [password, setPassword] = useState('123456');

    const loginButtonOnClick = (event) => {
        AuthService.login(history, username, password).then(() => {
        }, (error) => {
            toast.current.show({
                severity: 'error',
                summary: t('common.label.loginError'),
                detail: '',
                life: 3000
            });
        })
    }

    return (
        <>
            <Toast ref={toast}/>

            <div className="login">
                <div className="card p-fluid">
                    <div className="p-field">
                        <label>{t('pages.login.username')}</label>
                        <InputText value={username} type="text" onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className="p-field">
                        <label>{t('pages.login.password')}</label>
                        <InputText value={password} type="password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    <Button label={t('common.buttons.login')} onClick={loginButtonOnClick}/>
                </div>
            </div>
        </>
    );
}
