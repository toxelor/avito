import axios from "axios";
export const baseUrl = "http://localhost:3000/";
axios.defaults.baseURL = baseUrl;

const ax = axios.create();

ax.interceptors.request.use((request) => {
        request.headers.set('content-type', 'application/json')
        return request;
    },
);

export default ax;
