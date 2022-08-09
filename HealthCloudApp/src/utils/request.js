import axios from "axios";
import { BASEURL } from "./path";
import Toast from "./toast";

const instance = axios.create({
    baseURL: BASEURL
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // console.log("添加请求拦截器")
    Toast.showLoading("请求中")
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // console.log("添加响应拦截器");
    Toast.hideLoading()
    return response.data;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });

export default {
    get:instance.get,
    post:instance.post
}