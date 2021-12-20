import AxiosApi from "../components/AxiosApi";
import {BASE_URL} from "./AuthService";

const list = () => {
    return AxiosApi.get(BASE_URL + `/workspace/list`, {})
        .then(response => {
            return response.data;
        }).catch((error) => {
            console.log('error ' + error);
        });
}

export default {list};
