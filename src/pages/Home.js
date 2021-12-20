import React, {useEffect, useRef, useState} from 'react';
import classNames from 'classnames';
import {Route, Switch} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';

import {AppTopbar} from '../AppTopbar';
import {AppFooter} from '../AppFooter';
import {AppMenu} from '../AppMenu';

import {Dashboard} from '../components/Dashboard';

import PrimeReact from 'primereact/api';

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import '../layout/flags/flags.css';
import '../layout/layout.scss';
import '../App.scss';
import {Login} from "./Login";
import {PrivateRoute} from "../components/PrivateRoute";
import {EnumRole} from "../common/EnumRole";
import {RequestPage} from "./request/RequestPage";
import {useTranslation} from "react-i18next";
import AxiosApi from "../components/AxiosApi";
import {Toast} from "primereact/toast";

const Home = () => {

    const {t} = useTranslation();
    const toast = useRef(null);

    const [layoutMode, setLayoutMode] = useState('static');
    const [layoutColorMode, setLayoutColorMode] = useState('light')
    const [inputStyle, setInputStyle] = useState('outlined');
    const [ripple, setRipple] = useState(true);
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);

    PrimeReact.ripple = true;

    let menuClick = false;
    let mobileTopbarMenuClick = false;

    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }
    }, [mobileMenuActive]);

    useEffect(() => {
        AxiosApi.defaults.headers.common['Authorization'] = `${JSON.parse(localStorage.getItem("token"))}`

        AxiosApi.interceptors.response.use((response) => {
                return response;
            },
            (error) => {
                let response = error.response;
                if ([401, 403].includes(response.status)) {
                    handleUnauthorized(response.status)
                }
            }
        );
    }, []);

    function handleUnauthorized(status) {
        if ([401, 403].includes(status)) {
            toast.current.show({severity: 'error', summary: '', detail: t('common.label.notAuthorized'), life: 3000});
            //TODO remove edilmesini istenirse
            // localStorage.clear();
            // window.location.reload(true);
        }
    }

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    }

    const onRipple = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value)
    }

    const onLayoutModeChange = (mode) => {
        setLayoutMode(mode)
    }

    const onColorModeChange = (mode) => {
        setLayoutColorMode(mode)
    }

    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }

        if (!mobileTopbarMenuClick) {
            setMobileTopbarMenuActive(false);
        }

        mobileTopbarMenuClick = false;
        menuClick = false;
    }

    const onToggleMenuClick = (event) => {
        menuClick = true;

        if (isDesktop()) {
            if (layoutMode === 'overlay') {
                if (mobileMenuActive === true) {
                    setOverlayMenuActive(true);
                }

                setOverlayMenuActive((prevState) => !prevState);
                setMobileMenuActive(false);
            } else if (layoutMode === 'static') {
                setStaticMenuInactive((prevState) => !prevState);
            }
        } else {
            setMobileMenuActive((prevState) => !prevState);
        }

        event.preventDefault();
    }

    const onSidebarClick = () => {
        menuClick = true;
    }

    const onMobileTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        setMobileTopbarMenuActive((prevState) => !prevState);
        event.preventDefault();
    }

    const onMobileSubTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        event.preventDefault();
    }

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    }
    const isDesktop = () => {
        return window.innerWidth >= 992;
    }

    const menu = [
        {
            label: '',
            items: [
                {label: t('menu.dashboard'), to: '/dashboard'},
                {label: t('menu.requestManagement'), to: '/request-page'}
            ]
        }
    ];

    const addClass = (element, className) => {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    const removeClass = (element, className) => {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    const wrapperClass = classNames('layout-wrapper', {
        'layout-overlay': layoutMode === 'overlay',
        'layout-static': layoutMode === 'static',
        'layout-static-sidebar-inactive': staticMenuInactive && layoutMode === 'static',
        'layout-overlay-sidebar-active': overlayMenuActive && layoutMode === 'overlay',
        'layout-mobile-sidebar-active': mobileMenuActive,
        'p-input-filled': inputStyle === 'filled',
        'p-ripple-disabled': ripple === false,
        'layout-theme-light': layoutColorMode === 'light'
    });

    return (
        <>
            <Toast ref={toast}/>
            <div className={wrapperClass} onClick={onWrapperClick}>
                <AppTopbar onToggleMenuClick={onToggleMenuClick} layoutColorMode={layoutColorMode}
                           mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick}/>

                <div className="layout-sidebar" onClick={onSidebarClick}>
                    <AppMenu model={menu} onMenuItemClick={onMenuItemClick} layoutColorMode={layoutColorMode}/>
                </div>

                <div className="layout-main-container">
                    <div className="layout-main">
                        <Switch>
                            <PrivateRoute role={EnumRole.USER} key="dashboard" exact path="/dashboard" component={<Dashboard/>}/>
                            <PrivateRoute role={EnumRole.USER} key="request-page" exact path="/request-page" component={<RequestPage/>}/>

                            <Route path="/login" exact component={Login}/>
                        </Switch>
                    </div>

                    <AppFooter layoutColorMode={layoutColorMode}/>
                </div>

                <CSSTransition classNames="layout-mask" timeout={{enter: 200, exit: 200}} in={mobileMenuActive} unmountOnExit>
                    <div className="layout-mask p-component-overlay"></div>
                </CSSTransition>
            </div>
        </>
    );
}

export default Home;
