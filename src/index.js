import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import ScrollToTop from './ScrollToTop';
import {AuthenticatedRoute} from "./components/AuthenticatedRoute";
import {Login} from "./pages/Login";
import Home from "./pages/Home";

import './i18next';

ReactDOM.render(
    <BrowserRouter>
        <ScrollToTop>
            <Switch>
                <Route key="login" exact path="/login" component={Login}/>
                <AuthenticatedRoute key="logged-in" path="/**" component={<Home/>}/>
            </Switch>
        </ScrollToTop>
    </BrowserRouter>,
    document.getElementById('root')
);
