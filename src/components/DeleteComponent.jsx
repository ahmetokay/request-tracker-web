import React, {useState} from "react";
import {Dialog} from "primereact/dialog";
import {useTranslation} from "react-i18next";
import {Button} from "primereact/button";
import DeleteDialogFooter from "./DeleteDialogFooter";

function DeleteComponent(props) {

    const {t} = useTranslation();
    const [dialog, setDialog] = useState(false);

    return (
        <>
            <Button icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text"
                    title={t('common.buttons.delete')}
                    onClick={() => {
                        setDialog(true);
                    }}/>
            <div className="p-text-left">
                <Dialog header={props.header} visible={dialog} modal style={{width: '550px'}}
                        footer={
                            <DeleteDialogFooter setDialog={setDialog} dialog={dialog} deleteData={props.deleteData}
                                                id={props.id}/>
                        } onHide={() => setDialog(false)}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{fontSize: '3rem'}}/>
                        <div>{t("common.label.deleteConfirm")}</div>
                    </div>
                </Dialog>
            </div>

        </>
    );
}

export default DeleteComponent;
