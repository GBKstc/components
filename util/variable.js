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