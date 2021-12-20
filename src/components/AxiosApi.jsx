import axios from "axios";
import {BASE_URL} from "../service/AuthService";

const AxiosApi = axios.create({
    baseURL: BASE_URL
});

export default AxiosApi;
