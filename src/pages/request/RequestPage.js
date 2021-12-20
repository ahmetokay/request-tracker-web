import React, {useEffect, useState} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import RequestService from "../../service/RequestService";
import {useTranslation} from "react-i18next";
import {Button} from "primereact/button";
import DeleteComponent from "../../components/DeleteComponent";
import {Dialog} from "primereact/dialog";
import InputText from "primereact/primereact.all.esm";

export const RequestPage = () => {

    const {t} = useTranslation();

    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(false);
    const [selectedData, setSelectedData] = useState({});

    const [dialog, setDialog] = useState(false);

    const fetchData = () => {
        setLoading(true)

        RequestService.list().then(response => {
            setData(response)

            setLoading(false)
        })
    }

    useEffect(() => {
        fetchData();
    }, []);

    const deleteData = (data) => {

        RequestService.deleteData(data).then(response => {
            if (response) {
                fetchData()
            }
        })
    }

    const selectRow = (rowData) => {

        setSelectedData(rowData);

        setDialog(true);
    }

    const editColumn = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-edit p-button-text"
                        title={t("common.buttons.edit")}
                        onClick={() => {
                            selectRow(rowData)
                        }}/>

                <DeleteComponent id={rowData} deleteData={deleteData}
                                 header={t("pages.requestManagement.delete")}/>
            </>
        )
    }

    return (
        <div className="grid">
            <div className="col-12">
                <h2>{t('menu.requestManagement')}</h2>

                <div className="card">
                    <div className="p-text-right p-mb-3">
                        <Button label={t('common.buttons.create')}
                                className="p-button-success"
                                onClick={() => {
                                    setDialog(true)
                                }}/>
                    </div>

                    <DataTable value={data}
                               loading={loading}
                               dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                               className="datatable-responsive"
                               paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                               currentPageReportTemplate={t('common.label.paginator')}
                               emptyMessage={t('common.label.noDataFound')}>
                        <Column field="name" header={t('pages.requestManagement.name')}></Column>
                        <Column field="port" header={t('pages.requestManagement.port')}></Column>
                        <Column field="protocol" header={t('pages.requestManagement.protocol')}></Column>
                        <Column field="requestType" header={t('pages.requestManagement.requestType')}></Column>
                        <Column field="scheduledType" header={t('pages.requestManagement.scheduledType')}></Column>
                        <Column field="url" header={t('pages.requestManagement.url')}></Column>
                        <Column field="workspace.name" header={t('pages.requestManagement.workspace')}></Column>
                        <Column style={{width: '30px'}} body={editColumn}/>
                    </DataTable>

                    <Dialog header={selectedData?.id === undefined ? t('common.label.createHeader') : t('common.label.editHeader')}
                            visible={dialog} modal
                            onHide={() => setDialog(false)}>
                        <div className="p-fluid">

                            {/*<input type="hidden" name="updateData" ref={register} value={selectedData.id ? "true" : "false"}/>*/}

                            <label htmlFor="username" className="p-col-fixed"
                                   style={{width: '100px'}}>{t('pages.userManagement.username')}</label>
                            <div className="p-col">
                                <InputText name="name" defaultValue={selectedData.name} />
                            </div>

                            <Button type="submit" className="p-button-success" label={t('common.buttons.submit')}/>
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}
