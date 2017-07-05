import axios from 'axios'
import qs from 'qs'

import * as _ from '../util/tool'

// axios 配置;
axios.defaults.timeout = 5000; // ajax 时限5秒;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' // 数据头
axios.defaults.baseURL = 'http://localhost:3000';

// post 传参序列化
axios.interceptors.request.use((config) => {
	if (config.method === 'post')
		config.data = qs.stringify(config.data);
	return config;
}, (error) => {
	_.toast('错误的传参', 'fail');
	return Promise.reject(error);
})

axios.interceptors.response.use((res) => {
	if (!res.data.success)
		return Promise.reject(res);
	return res;
}, (error) => {
	_.toast('网络异常', 'fail');
	return Promise.reject(error);
});

export function fetch(url, params) {
	return new Promise((resolve, reject) => {
		axios.post(url, params)
			.then(response => {
				resolve(response.data);
			}, err => {
				reject(err);
			})
			.catch((error) => {
				reject(error)
			})
	})
}

export default {
    getUser() {
        return fetch('/user/getUser');
    },
    getUserTimes() {
        return fetch('/user/getTimes');
    },
    setUserTimes(params){
        return fetch('/user/setTimes',params);
    },
    delUserTimes(params){
        return fetch('/user/delTimes',params);
    }
}