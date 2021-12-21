import React, {useEffect, useState} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {useTranslation} from "react-i18next";
import {Button} from "primereact/button";
import DeleteComponent from "../../components/DeleteComponent";
import {Dialog} from "primereact/dialog";
import {InputText} from 'primereact/inputtext';
import WorkspaceService from "../../service/WorkspaceService";
import DateComponent from "../../components/DateComponent";

export const WorkspaceManagement = () => {

    const {t} = useTranslation();

    const [data, setData] = useState([]);

    const emptyData = {
        name: ''
    };

    const [loading, setLoading] = useState(false);
    const [selectedData, setSelectedData] = useState(emptyData);

    const [dialog, setDialog] = useState(false);


    const fetchData = () => {
        setLoading(true)

        WorkspaceService.list().then(response => {
            setData(response)

            setLoading(false)
        })
    }

    const clearData = () => {
        setSelectedData(emptyData)
    }

    useEffect(() => {
        fetchData();
    }, []);

    const deleteData = (selectedData) => {

        WorkspaceService.deleteData(selectedData).then(response => {
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
            <div className="p-text-right">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-edit p-button-text"
                        title={t("common.buttons.edit")}
                        onClick={() => {
                            selectRow(rowData)
                        }}/>

                <DeleteComponent id={rowData} deleteData={deleteData}
                                 header={t("pages.requestManagement.delete")}/>
            </div>
        )
    }

    const onChange = (e) => {
        setSelectedData({...selectedData, [e.target.name]: e.target.value})
    };

    const saveData = () => {
        if (selectedData.id) {
            WorkspaceService.updateData(selectedData).then(response => {
                if (response) {
                    fetchData()
                }
            })
        } else {
            WorkspaceService.saveData(selectedData).then(response => {
                if (response) {
                    fetchData()
                }
            })
        }

        setDialog(false)
    };

    return (
        <div className="grid">
            <div className="col-12">
                <h2>{t('menu.workspaceManagement')}</h2>

                <div className="card">
                    <div className="p-text-right p-mb-3">
                        <Button label={t('common.buttons.create')}
                                className="p-button-success"
                                onClick={() => {
                                    clearData()
                                    setDialog(true)
                                }}/>
                    </div>

                    <DataTable value={data}
                               loading={loading}
                               dataKey="id" paginator rows={10} rowsPerPageOptions={[10, 50, 100]}
                               className="datatable-responsive"
                               paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                               currentPageReportTemplate={t('common.label.paginator')}
                               emptyMessage={t('common.label.noDataFound')}>
                        <Column field="created" header={t('pages.workspaceManagement.createTime')} body={DateComponent.formatDate}></Column>
                        <Column field="name" header={t('pages.workspaceManagement.name')}></Column>
                        <Column body={editColumn}/>
                    </DataTable>
                </div>
            </div>

            <Dialog
                header={selectedData?.id === undefined ? t('common.label.createHeader') : t('common.label.editHeader')}
                visible={dialog} modal onHide={() => setDialog(false)}>

                <div className="p-fluid">
                    <div className="p-field">
                        <label>{t('pages.requestManagement.name')}</label>
                        <InputText name="name" value={selectedData?.name} type="text" onChange={onChange}/>
                    </div>

                    <Button className="p-button-success" label={t('common.buttons.submit')} onClick={saveData}/>
                </div>
            </Dialog>
        </div>
    );
}