import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import classNames from 'classnames';
import Language from "./components/Language";
import AuthService from "./service/AuthService";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {useTranslation} from "react-i18next";

export const AppTopbar = (props) => {

    const history = useHistory();
    const {t} = useTranslation();

    const [displayLogoutConfirmation, setDisplayLogoutConfirmation] = useState(false);

    const getUserName = () => {

        let userName = "";
        let user = AuthService.getCurrentUser();
        if (user) {
            userName = user.name;
        }

        return userName;
    }

    const logout = () => {
        AuthService.revokeCurrentToken();
        localStorage.clear();
        history.push("/login");
    }

    const renderConfirm = () => {
        return (
            <div>
                <Button label={t('common.buttons.no')} icon="pi pi-times" onClick={() => setDisplayLogoutConfirmation(false)} className="p-button-text"/>
                <Button label={t('common.buttons.yes')} icon="pi pi-check" onClick={() => logout()} autoFocus/>
            </div>
        );
    }

    return (
        <div className="layout-topbar">
            <Link to="/dashboard" className="layout-topbar-logo">
                <img src={props.layoutColorMode === 'light' ? 'assets/layout/images/logo-dark.svg' : 'assets/layout/images/logo-white.svg'} alt="logo"/>
                <span>SAKAI</span>
            </Link>

            <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                <i className="pi pi-bars"/>
            </button>

            <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
                <i className="pi pi-ellipsis-v"/>
            </button>

            <ul className={classNames("layout-topbar-menu lg:flex origin-top", {'layout-topbar-menu-mobile-active': props.mobileTopbarMenuActive})}>
                <li>
                    <div className="topbar-button p-mr-3">
                        {getUserName()}
                    </div>
                </li>

                <li>
                    <Language/>
                </li>

                <li>
                    <button className="p-link layout-topbar-button" onClick={() => setDisplayLogoutConfirmation(true)}>
                        <i className="pi pi-user"/>
                        <span>{getUserName()}</span>
                    </button>
                </li>
            </ul>

            <Dialog header={t('common.dialog.logoutTitle')} visible={displayLogoutConfirmation} modal style={{width: '500px'}}
                    footer={renderConfirm()} onHide={() => setDisplayLogoutConfirmation(false)}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{fontSize: '3rem'}}/>
                    <span>{t('common.dialog.logoutMessage')}</span>
                </div>
            </Dialog>
        </div>
    );
}
