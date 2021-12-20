import React, {useEffect, useState} from "react";
import {Route} from "react-router-dom";
import NotAuthorized from "./NotAuthorized";
import AuthService from "../service/AuthService";

export const PrivateRoute = ({component: Component, ...rest}) => {

    const [pageData, setPageData] = useState();

    useEffect(() => {
        if (AuthService.checkRole(rest.role) === true) {
            setPageData(Component)
        } else {
            setPageData(<NotAuthorized/>)
        }
    }, []);

    return (
        <Route {...rest} render={props => (pageData)}/>
    )
}
