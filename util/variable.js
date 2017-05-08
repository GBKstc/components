/**
 * Created by Administrator on 2017/5/7.
 */


/**
 * 深度拷贝, 防止因直接赋值引起的地址相同问题
 * @returns {*}
 */
export function cpy(o){
	let res = {};
	switch(typeof o){
		case "object":
			//判断o是否是react组件对象， 如果是 直接赋值
			if(!isEmpty(o) && o["$$typeof"] == Symbol.for('react.element')) {
				res = o;
				break;
			}
			if(isArray(o))
				res = [];
			for(let i in o){
				res[i] = cpy(o[i]);
			}
			break;
		default: res = o; break;
	}
	return res;
}

/**
 * 判断一个变量是否是数组
 * @returns boolean
 */
export function isArray(o){
	return  Object.prototype.toString.call(o) === '[object Array]';
}
/**
 * 判断是否为空且替换默认值
 * @returns {*}
 */
export function getVal(obj, defaultValue = ""){
	return isEmpty(obj) ? defaultValue : obj;
}

/**
 * 判断是否为空
 * @returns boolean
 */
export function isEmpty(o) {
	if (o == null||o == undefined){
		return true
	}
	switch (typeof o){
		case "boolean":
			return false;
		case "string":
			return o.length <= 0;
		case "number":
			return o.toString().length <= 0;
		case "object":
			for (let a in o){
				return false;
			}
			return true;
		case "function":
			return false;
	}
}

/**
 * 获取变量的长度
 * string 获取字符数
 * object 获取其children数量(一级)
 * @param o 输入参数
 * @returns int
 */
export function count(o){
	switch (typeof o){
		case "string":
			return o.length;
		case "object":
			if (isArray(o)){
				return o.length;
			}
			var n = 0;
			for(var i in o)
				n++;
			return n;
	}
	return 0;
}

/**
 * 判断两个变量是否相同
 * @returns {boolean}
 */
export function isEqual(a, b) {
	if(isEmpty(a) && isEmpty(b))
		return true;
	if(isEmpty(a) || isEmpty(b))
		return false;
	switch (typeof a){
		case "object":
			if(count(a) != count(b))
				return false;
			for(let i in a){
				if(!isEqual(a[i], b[i]))
					return false;
			}
			return true;
		default:
			return a === b;
	}
}

/**
 * 判断元素是否在数组中
 * @param obj
 * @param arr
 * @returns {boolean}
 */
export function in_array(obj, arr){
	if(isEmpty(arr)){
		return false;
	}
	if(!isArray(arr)){
		return false;
	}
	var i = arr.length;
	while (i--) {
		if (arr[i] == obj)
			return true;
	}
	return false;
}

/**
 * 从数组中删除指定的元素
 * @param obj
 * @param arr
 */
export function array_remove(obj, arr){
	for(var i=0;i < arr.length;i++) {
		if(obj == arr[i]){
			arr.splice(i,1);
		}

	}
	return arr;
}

/**
 * 获取对象的所有键名
 * @param obj
 * @returns {Array}
 */
export function key_arr(obj){
	let res = [];
	for(let i in obj){
		res.push(i);
	}
	return res;
}

/**
 * 找最大值
 * @returns {max}
 */
export function s_max(arr, default_res = 0){
	if(typeof arr !== "object" || count(arr) <= 1 || !isArray(arr))
		return default_res;
	let max = default_res;
	for(let i in arr){
		max = Math.max(arr[i], max);
	}
	return max;
}

/**
 *字符串替换所有的匹配字符
 * @param str
 * @param str
 * @param str
 * @return str
 */
export function replaceAll(str,oldString='',newString=''){
	if (typeof str !== "string"){
		return str;
	}
	str = str.replace(new RegExp(oldString,"gm"),newString);
	return str
}

/**
 *去格式化字符串，去掉所有的空格和换行符
 * @param str
 * @return str
 */
export function format_str(str){
	if (typeof str !== "string"){
		return str;
	}
	str = str.replace(/\s/g, "");
	str = str.replace(/[\n]/g,"")
	str = str.replace(/[\r]/g,"")
	return str
}

/**
 *格式化字符串，加上空格和换行符
 * @param str
 * @return str
 */
export function unformat_str(str){
	var curLevel = 0;
	var res = ''
	for(var i in str){
		if(str[i] == '{'){
			res += '{\n';
			curLevel += 1;
			for(var j = 0; j < curLevel*8; j++){
				res += ' ';
			}
		}else if(str[i] == '}'){
			res += '\n'
			curLevel = curLevel - 1;
			for(var j = 0; j < curLevel*8; j++){
				res += ' ';
			}
			res += '}'
		}else if(str[i] == ','){
			res += ',\n'
			for(var j = 0; j < curLevel*8; j++){
				res += ' ';
			}
		}else{
			res += str[i]
		}
	}
	return res
}

/**
 * 判断i是否在begin和end的范围内
 * @returns {boolean}
 */
export function in_range(i, begin, end){
	//默认是数字
	if(begin > end){
		let tmp = end;
		end = begin;
		begin = tmp
	}
	return i>=begin && i<=end;
}

/**
 * 根据key值查数据，返回数量
 * @returns {boolean}
 */
export function keyCount(arr, key, val){
	if(isEmpty(arr))
		return 0;
	let count = 0;
	for(let i in arr){
		if(!isEmpty(arr[i][key]) && arr[i][key] == val)
			count++;
	}
	return count;
}

export function subArrByKeyEq(arr, key, val){
	if(isEmpty(arr))
		return 0;
	let res = [];
	for(let i in arr){
		if (!arr.hasOwnProperty(i))
			continue;
		if(!isEmpty(arr[i][key]) && arr[i][key] == val)
			res.push(arr[i]);
	}
	return res;
}

export function subArrByKeyNeq(arr, key, val){
	let res = [];
	if(isEmpty(arr))
		return res;
	for(let i in arr){
		if (!arr.hasOwnProperty(i))
			continue;
		if(isEmpty(arr[i][key]) || arr[i][key] != val)
			res.push(arr[i]);
	}
	return res;
}

//根据key值查第一条数据，如果数据存在返回true，如果数据不存在返回false
export function findDataByKey(arr, key, val){
	if(isEmpty(arr))
		return false;
	for(let i in arr){
		if (!arr.hasOwnProperty(i))
			continue;
		if(!isEmpty(arr[i][key]) && arr[i][key] == val)
			return true;
	}
	return false;
}
//根据key值查数据，如果数据存在返回当前条目，如果数据不存在返回空
export function findItemByKey(arr, key, val){
	if(isEmpty(arr))
		return {};
	for(let i in arr){
		if (!arr.hasOwnProperty(i))
			continue;
		if(!isEmpty(arr[i][key]) && arr[i][key] == val){
			return arr[i];
		}
	}
	return {};
}
//根据key值查数据，返回所有
export function findArrIndexByKey(arr, key, val){
	if(isEmpty(arr))
		return 0;
	let res = [];
	for(let i in arr){
		if (!arr.hasOwnProperty(i))
			continue;
		if(!isEmpty(arr[i][key]) && arr[i][key] == val){
			res.push(i);
		}
	}
	return res;
}

//range
export function range(start, end) {
	const result = [];
	for (let i = start; i <= end; i++) {
		result.push(i);
	}
	return result;
}

export function isNum(n){
	return typeof n == "number";
}

export function rand(a, b){
	return a + Math.random() * (b - a);
}

export function getOption(text, optionos){
	let res = "";
	for(let key in optionos){
		if(optionos.hasOwnProperty(key) && text == optionos[key]["key"])
			res = optionos[key]["title"];
	}
	return res;
}

export function getArrOption(arr, option){
	let res = [];
	for(let i in arr){
		res.push(getOption(arr[i], option));
	}
	return res;
}

export function array_diff(a, b) {
	for(var i=0;i<b.length;i++)
	{
		for(var j=0;j<a.length;j++)
		{
			if(isEqual(a[j], b[i])){
				a.splice(j,1);
				j=j-1;
			}
		}
	}
	return a;
}

export function keyCpyObj(o, keys){
	let res = {};
	for(let i in keys){
		let key = keys[i];
		res[key] = o[key];
	}
	return res;
}