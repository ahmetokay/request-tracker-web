import React from "react";
import {useTranslation} from "react-i18next";
import {Button} from "primereact/button";

function DeleteDialogFooter(props) {
    const {t} = useTranslation();

    return (
        <div>
            <Button label={t('common.buttons.no')} icon="pi pi-times" onClick={() => props.setDialog(false)}
                    className="p-button-text"/>
            <Button label={t('common.buttons.yes')} icon="pi pi-check" onClick={() => {
                props.setDialog(false);
                props.deleteData(props.id)
            }} autoFocus/>
        </div>
    );
}

export default DeleteDialogFooter;