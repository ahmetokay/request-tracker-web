import AxiosApi from "../components/AxiosApi";
import {BASE_URL} from "./AuthService";

const filter = (requestId) => {
    return AxiosApi.get(BASE_URL + `/request-history/filter/` + requestId, {})
        .then(response => {
            return response.data;
        }).catch((error) => {
            console.log('error ' + error);
        });
}

export default {filter};
