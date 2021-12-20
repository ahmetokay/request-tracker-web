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

            <div className="card p-fluid">
                <h5>Login Application</h5>
                <div className="field grid">
                    <label htmlFor="name3" className="col-12 mb-2 md:col-2 md:mb-0">Username</label>
                    <div className="col-12 md:col-10">
                        <InputText value={username} type="text" onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                </div>
                <div className="field grid">
                    <label htmlFor="email3" className="col-12 mb-2 md:col-2 md:mb-0">Password</label>
                    <div className="col-12 md:col-10">
                        <InputText value={password} type="password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                </div>

                <Button label="Login" onClick={loginButtonOnClick}/>
            </div>
        </>
    );
}
