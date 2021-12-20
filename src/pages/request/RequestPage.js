import React, {useEffect, useState} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import RequestService from "../../service/RequestService";
import {useTranslation} from "react-i18next";
import {Button} from "primereact/button";
import DeleteComponent from "../../components/DeleteComponent";
import {Dialog} from "primereact/dialog";
import {InputText} from 'primereact/inputtext';
import EnumService from "../../service/EnumService";
import {Dropdown} from "primereact/dropdown";
import WorkspaceService from "../../service/WorkspaceService";

export const RequestPage = () => {

    const {t} = useTranslation();

    const [data, setData] = useState([]);
    const [workspaceData, setWorkspaceData] = useState([]);

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

        WorkspaceService.list().then(response => {
            setWorkspaceData(response)
        })
    }, []);

    const deleteData = (selectedData) => {

        RequestService.deleteData(selectedData).then(response => {
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

    const onChange = (e) => {
        setSelectedData({...selectedData, [e.target.name]: e.target.value})
    };

    const saveData = () => {
        if (selectedData.id) {
            RequestService.updateData(selectedData).then(response => {
                if (response) {
                    fetchData()
                }
            })
        } else {
            RequestService.saveData(selectedData).then(response => {
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
                </div>
            </div>

            <Dialog
                header={selectedData?.id === undefined ? t('common.label.createHeader') : t('common.label.editHeader')}
                visible={dialog} modal onHide={() => setDialog(false)}>

                <div className="p-fluid">
                    <div className="field">
                        <label>{t('pages.requestManagement.name')}</label>
                        <InputText name="name" value={selectedData?.name} type="text" onChange={onChange}/>
                    </div>

                    <div className="field">
                        <label>{t('pages.requestManagement.port')}</label>
                        <InputText name="port" value={selectedData?.port} type="text" onChange={onChange}/>
                    </div>

                    <div className="field">
                        <label>{t('pages.requestManagement.protocol')}</label>
                        <Dropdown name="protocol" optionLabel='name' value={selectedData?.protocol}
                                  options={EnumService.findEnum(t, 'protocolType')}
                                  onChange={onChange}
                                  placeholder={t('common.label.choose')}/>
                    </div>

                    <div className="field">
                        <label>{t('pages.requestManagement.requestType')}</label>
                        <Dropdown name="requestType" optionLabel='name' value={selectedData?.requestType}
                                  options={EnumService.findEnum(t, 'requestType')}
                                  onChange={onChange}
                                  placeholder={t('common.label.choose')}/>
                    </div>

                    <div className="field">
                        <label>{t('pages.requestManagement.scheduledType')}</label>
                        <Dropdown name="scheduledType" optionLabel='name' value={selectedData?.scheduledType}
                                  options={EnumService.findEnum(t, 'scheduledType')}
                                  onChange={onChange}
                                  placeholder={t('common.label.choose')}/>
                    </div>

                    <div className="field">
                        <label>{t('pages.requestManagement.url')}</label>
                        <InputText name="url" value={selectedData?.url} type="text" onChange={onChange}/>
                    </div>

                    <div className="field">
                        <label>{t('pages.requestManagement.workspace')}</label>
                        <Dropdown name="workspace" optionLabel='name' value={selectedData?.workspace}
                                  options={workspaceData}
                                  onChange={onChange}
                                  placeholder={t('common.label.choose')}/>
                    </div>

                    <Button className="p-button-success" label={t('common.buttons.submit')} onClick={saveData}/>
                </div>
            </Dialog>
        </div>
    );
}
