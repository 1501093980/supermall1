
import axios from 'axios'

export function request(config) {
    const instance = axios.create({
        baseURL:'http://152.136.185.210:8000/api/z8',
        timeout:5000
    })
//拦截请求
    instance.interceptors.request.use(config => {
        // console.log('请求拦截');
        return config
    },err=> {
        console.log(err);
    })

//响应拦截
    instance.interceptors.response.use(res => {
        console.log('响应拦截，请求成功');
        return res.data
    }, err => {
        console.log(err);
    })

    return instance(config)
}

