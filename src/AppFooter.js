import React from 'react';

export const AppFooter = (props) => {

    return (
        <div className="layout-footer">
            <span className="font-medium ml-2">© {(new Date().getFullYear())} RequestTracker</span>
        </div>
    );
}
