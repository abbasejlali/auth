import axios from "axios";

const callApi = () => {
    const axiosInstance = axios.create({
        baseURL : 'http://localhost:5000/api'
    })

    axiosInstance.interceptors.request.use(
        (config) => {
            
            config.withCredentials = true;
            return config;
        },
        err => { throw err } 
    )

    axiosInstance.interceptors.response.use(
        res => {
            return res;
        },
        err => {
            const res = err?.response;
            // config errors and set exceptions


            throw err; 
        }
    )

    return axiosInstance;
}


export default callApi;