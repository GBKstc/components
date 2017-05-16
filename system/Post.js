/**
 * Created by siver on 2017/1/1
 */
import {message} from 'antd';
const rootUrl =  "http://116.62.40.165:7081/tube/";

const fetch = require('isomorphic-fetch');

export const Post = (url, parameters) => {
	//获取doctor_id
	if (parameters == undefined) parameters = {operator_id: ""};
	else parameters['operator_id'] = "";

	//生成http请求
	url = String(url);
	let newOptions = {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		method: 'post'
	};
	let form = '';
	for (let key in parameters) {
		let value = parameters[key];
		if (typeof value === 'object' || Array.isArray(value)) {
			value = JSON.stringify(value);
		}
		let item = key + '=' + encodeURIComponent(value);
		form = form.length == 0 ? form + item : form + '&' + item;
	}
	newOptions.body = form;
	return fetch(rootUrl + url, newOptions)
		.then(response => {
			if (response.status != 200) {
				message.error('请求错误!');
				throw 'post error';
			} else {
				return response.json();
			}
		})
		.then(json => {
			if (json.error == '1' || json.code == '1') {
				// message.error(json.msg);
				throw 'post error';
			} else {
				return json.data;
			}
		});
};

