import axios from 'axios';
import {createHashHistory} from 'history';
import {message} from 'antd';
var instance = axios.create({
    baseURL:'http://localhost:8413', //配置公共接口
    withCredentials:true,
    timeout:3000
})

// 配置axios请求拦截
instance.interceptors.request.use(
    config => {
        // debugger
        // 获取token，配置到请求头中
        const TOKEN = localStorage.getItem('token');
        console.log(121212)
        if(TOKEN){
            config.headers['token'] = TOKEN;
        }
        return config;
    },
    error =>{
        // 请求错误的处理
        console.warn(error);
        return Promise.reject(error);
    }
)

// 配置axios响应拦截
instance.interceptors.response.use(
    // 登陆失效的时，即服务端返回的状态码为555的时候
    res => {
        if(res.data.code === 555){
            // 移除localstorage中的token信息并且跳转到登录页面
            localStorage.removeItem("token");
            message.warn('登录过期');
            // createHashHistory().push('/login/');
            window.location.href='/login'

        }
        return res;
    },
    error => {
        // 响应错误
        return Promise.reject(error);
    }
)


// 对请求进行一个简单的封装
class http{
    static async get(url,params){
        return await instance.get(url,{params});
    }
    static async post(url,data){
        return await instance.post(url,data);
    }
}

// 导出http;
export default http;