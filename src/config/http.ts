import axios from 'axios';
// import  from 'react-native-config'
import Config from 'react-native-config'

// axios.defaults.baseURL = 'https://yapi.baidu.com';
axios.defaults.baseURL = 'https://test.apilab.cn';


console.log("URL:" + Config.API_URL);
//添加请求拦截器
axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    // console.log('request error', error)
    return Promise.reject(error);
})

//添加响应拦截器
axios.interceptors.response.use(function (response) {
    // console.log("响应数据:", response);
    return response.data;
}, function (error) {
    // console.log("response error:", error);
    return Promise.reject(error);

}) 