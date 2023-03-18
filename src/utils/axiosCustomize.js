import axios from "axios"
import NProgress from "nprogress";
import { store } from "../redux/store";
const instance = axios.create({
    baseURL: 'http://localhost:8081/'

})

NProgress.configure({
    showSpinner: false,
    trickleSpeed: 100,

})

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent   
    const accessToken = store?.getState()?.user?.account?.access_token;
    NProgress.start();
    config.headers["Authorization"] = 'Bearer ' + accessToken;
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    console.log('interceptors', response);
    NProgress.done();
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
});

export default instance;