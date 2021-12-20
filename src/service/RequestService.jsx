import AxiosApi from "../components/AxiosApi";
import {BASE_URL} from "./AuthService";

const deleteData = (data) => {
    return AxiosApi.post(BASE_URL + `/request/delete` , data)
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

export default {deleteData, list};
