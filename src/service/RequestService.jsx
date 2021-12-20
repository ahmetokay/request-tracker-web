import AxiosApi from "../components/AxiosApi";
import {BASE_URL} from "./AuthService";

const saveData = (data) => {
    return AxiosApi.post(BASE_URL + `/request/save`, data)
        .then(response => {
            return response.data;
        }).catch((error) => {
            console.log('error ' + error);
        });
}

const updateData = (data) => {
    return AxiosApi.post(BASE_URL + `/request/update`, data)
        .then(response => {
            return response.data;
        }).catch((error) => {
            console.log('error ' + error);
        });
}

const deleteData = (data) => {
    return AxiosApi.post(BASE_URL + `/request/delete`, data)
        .then(response => {
            return response.data;
        }).catch((error) => {
            console.log('error ' + error);
        });
}

const list = () => {
    return AxiosApi.get(BASE_URL + `/request/list`, {})
        .then(response => {
            return response.data;
        }).catch((error) => {
            console.log('error ' + error);
        });
}

export default {saveData, updateData, deleteData, list};
